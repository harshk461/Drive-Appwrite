"use client";

import {
  Check,
  Grid2X2,
  HardDrive,
  Home,
  Menu,
  Plus,
  Search,
  Star,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import CustomDropdown from "../component/CustomDropDown";
import FileBox from "../component/FileBox";
import FileTable from "../component/FileTable";
import { fileTypes } from "../Constants/Constants";
import { getAllData } from "@/actions/file/file";
import { getUser } from "@/Utils/appwrite";
import { useRouter } from "next/navigation";
import { useUser } from "./context/context";

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

export default function Page() {
  const navigator = useRouter();

  const [data, setData] = useState<File[]>([]);
  const [display, setDisplay] = useState(1);
  const [newFileDisplay, setNewFileDisplay] = useState(false);
  const [filter, setFilter] = useState("");
  const [filterData, setFilterData] = useState<File[]>([]);
  const [selectedFileType, setSelectedFileType] = useState<FileType | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const getData = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const res: any = await getAllData();
        if (res) {
          setData(res);
          setFilterData(res);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    // logger.info("sjdkd");

    getData();
  }, [newFileDisplay, user]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    applyFilters(e.target.value, selectedFileType);
  };

  const applyFilters = (searchTerm: string, fileType: FileType | null) => {
    let filteredData = data;
    if (fileType && fileType.value !== "all") {
      filteredData = filteredData.filter(
        (file) => file.type.split("/")[1] === fileType.value
      );
    }
    if (searchTerm) {
      filteredData = filteredData.filter((file) =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilterData(filteredData);
  };

  useEffect(() => {
    applyFilters(filter, selectedFileType);
  }, [selectedFileType, data]);

  return (
    <div
      className="w-full h-full flex lg:flex-row flex-col items-start justify-center bg-white rounded-2xl
    dark:bg-[#131314]"
    >
      {!user ? (
        <div className="text-2xl font-semibold text-white py-8">
          Please log in to access your files.
        </div>
      ) : (
        <>
          <div className="w-full flex flex-col pt-6 px-6 pb-4 rounded-2xl bg-white overflow-y-scroll dark:bg-[#131314]">
            <h1 className="text-2xl font-semibold text-white mx-auto">
              Welcome to Drive
            </h1>
            <div className="w-full lg:w-2/3 m-auto flex flex-col lg:flex-row gap-4 items-center mt-4">
              <div className="w-full flex items-center justify-center px-6 py-2 rounded-full bg-[#E9EEF6] dark:bg-[#37393B] gap-4 mx-auto">
                <Search />
                <input
                  type="text"
                  className="w-full bg-transparent outline-none text-md font-medium "
                  placeholder="Search in Drive"
                  value={filter}
                  onChange={handleSearchChange}
                />
              </div>
              <CustomDropdown
                fileTypes={fileTypes}
                title="Type"
                setValue={setSelectedFileType}
              />
            </div>

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

            {/* All Files */}
            <div className="flex flex-col mt-4">
              {/* Table Structure of files */}
              {display == 1 && (
                <div className="w-full flex flex-col">
                  {filterData && filterData.length === 0 ? (
                    <div className="text-white text-center text-2xl">
                      {loading ? (
                        <div className="w-[50px] h-[50px] rounded-full animate-spin border-4 border-gray-400 dark:border-white border-t-gray-800 dark:border-t-gray-400 m-auto"></div>
                      ) : (
                        "No Data Present"
                      )}
                    </div>
                  ) : (
                    <FileTable data={filterData} />
                  )}
                </div>
              )}
              {/* Block Structure of Files */}
              {display === 2 && (
                <div className="w-full flex flex-wrap gap-2">
                  {filterData.length === 0 ? (
                    <div className="text-white text-center text-2xl">
                      {loading ? (
                        <div className="w-[50px] h-[50px] rounded-full animate-spin border-4 border-gray-400 dark:border-white border-t-gray-800 dark:border-t-gray-400 m-auto"></div>
                      ) : (
                        "No Data Present"
                      )}
                    </div>
                  ) : (
                    filterData.map((file, index) => (
                      <FileBox
                        file={file.file}
                        $id={file.$id}
                        key={index}
                        name={file.name}
                        type={file.type}
                        createdAt={file.createdAt}
                        url={file.previewUrl ? file.previewUrl : ""}
                      />
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
