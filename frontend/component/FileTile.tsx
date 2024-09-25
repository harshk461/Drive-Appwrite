import {
  GetFileView,
  DownloadFile,
  UnStartFile,
  StarFile,
  DeleteFile,
} from "@/actions/file/file";
import { Pencil, Delete, Trash, Download, StarOff, Star } from "lucide-react";
import React from "react";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
  FaFileImage,
  FaFileAlt,
} from "react-icons/fa";

const getFileIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "pdf":
      return <FaFilePdf className="inline-block w-4 h-4 mr-2 text-red-600" />;
    case "doc":
    case "docx":
      return <FaFileWord className="inline-block w-4 h-4 mr-2 text-blue-600" />;
    case "xls":
    case "xlsx":
      return (
        <FaFileExcel className="inline-block w-4 h-4 mr-2 text-green-600" />
      );
    case "ppt":
    case "pptx":
      return (
        <FaFilePowerpoint className="inline-block w-4 h-4 mr-2 text-orange-600" />
      );
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return (
        <FaFileImage className="inline-block w-4 h-4 mr-2 text-blue-600" />
      );
    default:
      return <FaFileAlt className="inline-block w-4 h-4 mr-2 text-blue-600" />;
  }
};

export default function FileTile({ file }) {
  const Delete = async (id: string) => {
    try {
      await DeleteFile(id);
    } catch (e) {
      console.log(e);
    }
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
  };
  return (
    <div className="flex items-center justify-between px-4 py-2 rounded-lg group hover:bg-[#e4e5e6] dark:hover:bg-gray-800">
      <div
        className="flex-[2] flex items-center cursor-pointer"
        onClick={() => GetFileView(file.file)}
      >
        {getFileIcon(file.type.split("/")[1])}
        <span className="">{file.name}</span>
      </div>
      <div className="flex-1 ">{file.type.split("/")[1]}</div>
      <div className="flex-1 ">{formatDate(file.createdAt)}</div>
      <div className="flex-1 flex justify-end items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="p-2 rounded-full text-gray-400 hover:bg-gray-300 transition-all duration-200">
          <Pencil />
        </button>
        <button
          onClick={() => Delete(file.$id)}
          className="p-2 rounded-full text-gray-400 hover:bg-gray-300 transition-all duration-200"
        >
          <Trash />
        </button>
        <button
          onClick={() => DownloadFile(file.$id)}
          className="p-2 rounded-full text-gray-400 hover:bg-gray-300 transition-all duration-200"
        >
          <Download />
        </button>
        {file.starred ? (
          <button
            onClick={() => UnStartFile(file.$id)}
            className="p-2 rounded-full text-gray-400 hover:bg-gray-300 transition-all duration-200"
          >
            <StarOff />
          </button>
        ) : (
          <button
            onClick={() => StarFile(file.$id)}
            className="p-2 rounded-full text-gray-400 hover:bg-gray-300 transition-all duration-200"
          >
            <Star />
          </button>
        )}
      </div>
    </div>
  );
}
