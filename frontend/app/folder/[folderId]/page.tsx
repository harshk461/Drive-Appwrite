"use client";

import { getAllData } from "@/actions/file/file";
import { useUser } from "@/app/context/context";
import CustomDropdown from "@/component/CustomDropDown";
import FileBox from "@/component/FileBox";
import FileTile from "@/component/FileTile";
import FolderBox from "@/component/FolderBox";
import FolderTile from "@/component/FolderTile";
import NewFile from "@/component/NewFile";
import NewFolder from "@/component/NewFolder";
import { fileTypes } from "@/Constants/Constants";
import { account, database, getUser } from "@/Utils/appwrite";
import { Query } from "appwrite";
import { Check, Files, Grid2X2, Menu, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdArrowRoundBack } from "react-icons/io";

interface File {
  file: string;
  $id: string;
  name: string;
  type: string;
  createdAt: string;
  previewUrl: string;
  starred: boolean;
}
type FileType = {
  value: string;
  label: string;
  icon: JSX.Element;
};

interface Folder {
  $id: string;
  folderId: string;
  folderName: string;
  createdAt: string;
  parentfolderId: string;
}

export default function FolderID() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [data, setData] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState<File[]>([]);
  const [filterFolder, setFilterFolder] = useState<Folder[]>([]);
  const [filter, setFilter] = useState("");
  const [newFileDisplay, setNewFileDisplay] = useState(false);
  const [newFolder, setNewFolder] = useState(false);
  const [display, setDisplay] = useState(1);
  const folderId: any = useParams().folderId;
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading

        const user = await account.get();
        if (!user) {
          toast.error("Login first");
          return;
        }

        // Run both API calls concurrently
        const [dataResponse, folderResponse] = await Promise.all([
          database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
            [
              Query.equal("email", user.email),
              Query.equal("folderId", folderId),
            ]
          ),
          database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_FOLDER_COLLECTION_ID!,
            [Query.equal("parentfolderId", folderId)]
          ),
        ]);

        const data: any = dataResponse;
        const folder: any = folderResponse;

        setData(data.documents);
        setFilterData(data.documents);
        setFolders(folder.documents);
        setFilterFolder(folder.documents);
      } catch (e) {
        console.error(e);
        toast.error("Server Error");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const [selectedFileType, setSelectedFileType] = useState<FileType | null>(
    null
  );

  const applyFilters = (searchTerm: string, fileType: FileType | null) => {
    let f = data;
    let fold = folders;

    if (fileType && fileType.value !== "all") {
      f = f.filter((file) => file.type.split("/")[1] === fileType.value);
    }
    if (searchTerm) {
      f = f.filter((file) =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      fold = fold.filter((file) =>
        file.folderName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilterData(f);
    setFilterFolder(fold);
  };

  useEffect(() => {
    applyFilters(filter, selectedFileType);
  }, [selectedFileType, filter, data, folders]);

  const router = useRouter();
  return (
    <div className="w-full p-4 flex flex-col gap-4 bg-white dark:bg-[#131314] rounded-2xl">
      {!user ? (
        <div className="text-2xl font-semibold text-white py-8">
          Please log in to access your files.
        </div>
      ) : (
        <>
          <div className="w-full flex justify-between items-center gap-4">
            <div
              onClick={() => router.back()}
              className="rounded-full hover:bg-gray-200 p-3 transition duration-200"
            >
              <IoMdArrowRoundBack size={25} />
            </div>
            <div className="flex gap-4 items-center">
              <input
                type="text"
                className="max-w-full w-[400px] border-2 rounded-full px-4 py-2 border-gray dark:bg-[#1B1B1B]"
                placeholder="Search"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              <CustomDropdown
                fileTypes={fileTypes}
                title="Type"
                setValue={setSelectedFileType}
              />
            </div>
          </div>

          <div className="flex gap-4 items-center my-4">
            {/* New File and New Folder Buttons */}
            <div className="w-full flex gap-4">
              <div
                onClick={() => setNewFileDisplay(true)}
                className="flex gap-2 items-center px-4 py-2 rounded-xl bg-[#F0F4F9] dark:bg-[#37393B] shadow-lg font-semibold 
      cursor-pointer hover:bg-[#C2E7FF] dark:hover:bg-[#292a2c] duration-200 transition"
              >
                <Plus />
                New File
              </div>
              <div
                onClick={() => setNewFolder(true)}
                className="flex gap-2 items-center px-4 py-2 rounded-xl bg-[#F0F4F9] dark:bg-[#37393B] shadow-lg font-semibold 
      cursor-pointer hover:bg-[#C2E7FF] dark:hover:bg-[#292a2c] duration-200 transition"
              >
                <Plus />
                New Folder
              </div>
            </div>

            {/* Display Mode Buttons (Menu & Grid) */}
            <div className="flex justify-end items-end w-full mt-4">
              <div className="flex border-2 border-black rounded-full dark:border-white">
                <div
                  className={`flex items-center px-2 py-1 gap-1 rounded-l-full ${
                    display === 1 && "bg-[#C2E7FF] dark:bg-blue-500"
                  }`}
                >
                  {display === 1 && (
                    <h1 className="text-xl font-semibold text-black dark:text-white ">
                      <Check size={20} />
                    </h1>
                  )}
                  <Menu onClick={() => setDisplay(1)} size={20} />
                </div>
                <div
                  className={`flex items-center px-2 py-1 gap-1 rounded-r-full border-l-2 border-l-white dark:border-l-black ${
                    display === 2 && "bg-[#C2E7FF] dark:bg-blue-500"
                  }
              `}
                >
                  {display === 2 && (
                    <h1 className="text-xl font-semibold text-black dark:text-white">
                      <Check size={20} />
                    </h1>
                  )}
                  <Grid2X2 onClick={() => setDisplay(2)} size={20} />
                </div>
              </div>
            </div>
          </div>

          {!loading && folders.length == 0 && data.length == 0 && (
            <div>
              <img
                src="/assets/images/nodata.png"
                alt="no data"
                className="aspect-w-4 aspect-h-3 m-auto w-[300px] h-[300px] dark:hidden"
              />
              <img
                src="/assets/images/nodata_dark.png"
                alt="no data"
                className="aspect-w-4 aspect-h-3 m-auto w-[300px] h-[300px] hidden dark:block"
              />
              <h1 className="text-lg font-semibold text-center">
                No Data Present
              </h1>
            </div>
          )}

          {folders.length > 0 && (
            <div className="w-full flex flex-col gap-2">
              <h1 className="text-lg font-semibold">Folders</h1>

              {display == 1 &&
                filterFolder.map((item, index) => (
                  <FolderTile
                    key={index}
                    folder={item}
                    setFolders={setFolders}
                  />
                ))}

              {display == 2 && (
                <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {filterFolder.map((item, index) => (
                    <FolderBox key={index} folder={item} />
                  ))}
                </div>
              )}
            </div>
          )}

          {filterData && filterData.length > 0 && (
            <div className="w-full flex flex-col gap-2">
              <h1 className="text-lg font-semibold">Files</h1>

              {/* List View */}
              {display == 1 &&
                filterData.map((item, index) => (
                  <FileTile key={index} file={item} />
                ))}

              {/* Grid View */}
              {display == 2 && (
                <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {filterData.map((file, index) => (
                    <FileBox
                      file={file.file}
                      $id={file.$id}
                      key={index}
                      name={file.name}
                      type={file.type}
                      createdAt={file.createdAt}
                      url={file.previewUrl ? file.previewUrl : ""}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {loading && <h1>Loading...</h1>}

      {newFileDisplay && (
        <NewFile
          folderId={folderId}
          setIsOpen={setNewFileDisplay}
          setFiles={setData}
        />
      )}
      {newFolder && (
        <NewFolder
          parentFolder={folderId}
          setIsOpen={setNewFolder}
          setFolders={setFolders}
        />
      )}
    </div>
  );
}
