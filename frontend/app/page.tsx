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
import CustomDropdown from "./component/CustomDropDown";
import FileBox from "./component/FileBox";
import FileTable from "./component/FileTable";
import NewFile from "./component/NewFile";
import { fileTypes } from "../Constants/Constants";
import { getAllData, GetFileView } from "@/actions/file/file";
import Link from "next/link";

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
  const [data, setData] = useState<File[]>([]);
  const [display, setDisplay] = useState(1);
  const [newFileDisplay, setNewFileDisplay] = useState(false);
  const [filter, setFilter] = useState("");
  const [filterData, setFilterData] = useState<File[]>([]);
  const [selectedFileType, setSelectedFileType] = useState<FileType | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
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

    getData();
  }, [newFileDisplay]);

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
    <div className="w-full h-full flex justify-center p-6 gap-4">
      <div className="w-1/4 flex flex-col p-4 rounded-lg items-start">
        <button
          onClick={() => setNewFileDisplay(true)}
          className="px-4 py-2 text-xl font-semibold bg-[#2C497F] text-white rounded-lg flex items-center dark:bg-gray-700"
        >
          <Plus />
          New
        </button>
        <div className="w-full px-8 py-2 flex gap-2 items-center mt-3 bg-[#2C497F] text-white rounded-lg dark:bg-gray-700">
          <Home />
          <h1 className="text-lg font-medium">Home</h1>
        </div>

        <div
          onClick={() => GetFileView("66a90300002910fc4b91")}
          className="w-full px-8 py-2 flex gap-2 items-center mt-3 bg-[#2C497F] text-white rounded-lg dark:bg-gray-700"
        >
          <HardDrive />
          <h1 className="text-lg font-medium">Drive</h1>
        </div>

        <Link
          href="/starred"
          className="w-full px-8 py-2 flex gap-2 items-center mt-3 bg-[#2C497F] text-white rounded-lg dark:bg-gray-700"
        >
          <Star />
          <h1 className="text-lg font-medium">Starred</h1>
        </Link>
      </div>

      <div className="w-3/4 flex flex-col pt-6 px-6 pb-4 rounded-2xl bg-[#2C497F] overflow-y-scroll dark:bg-gray-700">
        <h1 className="text-2xl font-semibold text-white mx-auto">
          Welcome to Drive
        </h1>
        <div className="w-2/3 m-auto flex gap-4 items-center mt-4">
          <div className="w-full flex items-center justify-center px-6 py-2 rounded-full bg-gray-800 gap-4 mx-auto">
            <Search />
            <input
              type="text"
              className="w-full bg-transparent outline-none text-md font-medium dark"
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
          <div className="flex border-2 border-white rounded-full">
            <div
              className={`flex items-center px-2 py-1 gap-1 rounded-l-full ${
                display === 1 && "bg-blue-500"
              }`}
            >
              {display === 1 && (
                <h1 className="text-xl font-semibold text-white">
                  <Check size={20} />
                </h1>
              )}
              <Menu onClick={() => setDisplay(1)} color="white" size={20} />
            </div>
            <div
              className={`flex items-center px-2 py-1 gap-1 rounded-r-full border-l-2 border-l-white ${
                display === 2 && "bg-blue-500"
              }`}
            >
              {display === 2 && (
                <h1 className="text-xl font-semibold text-white">
                  <Check size={20} />
                </h1>
              )}
              <Grid2X2 onClick={() => setDisplay(2)} color="white" size={20} />
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
      {newFileDisplay && <NewFile setIsOpen={setNewFileDisplay} />}
    </div>
  );
}
