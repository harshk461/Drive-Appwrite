import React from "react";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
  FaFileImage,
  FaFileAlt,
} from "react-icons/fa";
import { Pencil, Trash, Download, Star, StarOff } from "lucide-react";
import {
  DeleteFile,
  DownloadFile,
  GetFileView,
  StarFile,
  UnStartFile,
} from "@/actions/file/file";

interface File {
  file: string;
  $id: string;
  name: string;
  type: string;
  createdAt: string;
  previewUrl: string;
  starred: boolean;
}

const getFileIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "pdf":
      return (
        <FaFilePdf
          className="inline-block w-4 h-4 mr-2 text-red-600"
          size={20}
        />
      );
    case "doc":
    case "docx":
      return (
        <FaFileWord
          className="inline-block w-4 h-4 mr-2 text-blue-600"
          size={20}
        />
      );
    case "xls":
    case "xlsx":
      return (
        <FaFileExcel
          className="inline-block w-4 h-4 mr-2 text-green-600"
          size={20}
        />
      );
    case "ppt":
    case "pptx":
      return (
        <FaFilePowerpoint
          className="inline-block w-4 h-4 mr-2 text-orange-600"
          size={20}
        />
      );
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return (
        <FaFileImage
          className="inline-block w-4 h-4 mr-2 text-blue-600"
          size={20}
        />
      );
    default:
      return (
        <FaFileAlt
          className="inline-block w-4 h-4 mr-2 text-blue-600"
          size={20}
        />
      );
  }
};

interface FileTableProps {
  data: File[];
}

const FileTable: React.FC<FileTableProps> = ({ data }) => {
  const Delete = async (id: string) => {
    try {
      await DeleteFile(id);
      data.filter((file) => file.$id !== id);
    } catch (e) {
      console.log(e);
    }
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between px-4 py-2 rounded-t-lg">
        <div className="flex-[2] text-white font-semibold">Name</div>
        <div className="flex-1 text-white font-semibold">Type</div>
        <div className="flex-1 text-white font-semibold">Created At</div>
        <div className="flex-1 text-right text-white font-semibold"></div>
      </div>
      {data.map((file, index) => (
        <div
          key={index}
          className="flex items-center justify-between px-4 py-2 rounded-lg group hover:bg-[#2687dc] dark:hover:bg-gray-800"
        >
          <div
            className="flex-[2] flex items-center cursor-pointer"
            onClick={() => GetFileView(file.file)}
          >
            {getFileIcon(file.type.split("/")[1])}
            <span className="text-white">{file.name}</span>
          </div>
          <div className="flex-1 text-white">{file.type.split("/")[1]}</div>
          <div className="flex-1 text-white">{formatDate(file.createdAt)}</div>
          <div className="flex-1 flex justify-end items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="px-2 py-1 text-blue-800 hover:text-blue-900">
              <Pencil />
            </button>
            <button
              onClick={() => Delete(file.$id)}
              className="px-2 py-1 text-red-500 hover:text-red-700"
            >
              <Trash />
            </button>
            <button
              onClick={() => DownloadFile(file.$id)}
              className="px-2 py-1 text-green-500 hover:text-green-700"
            >
              <Download />
            </button>
            {file.starred ? (
              <button
                onClick={() => UnStartFile(file.$id)}
                className="px-2 py-1 text-yellow-500 hover:text-yellow-700"
              >
                <StarOff />
              </button>
            ) : (
              <button
                onClick={() => StarFile(file.$id)}
                className="px-2 py-1 text-yellow-500 hover:text-yellow-700"
              >
                <Star />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileTable;
