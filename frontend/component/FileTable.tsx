import React, { useEffect, useRef } from "react";
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

const FileTable: React.FC<FileTableProps> = ({ data }: { data: File[] }) => {
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
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="text-left text-white w-2/5">Name</th>
          <th className="text-left text-white w-1/5">Type</th>
          <th className="text-left text-white w-1/5">Created At</th>
          <th className="text-left text-white w-1/6"></th>
        </tr>
      </thead>
      <tbody>
        {data.map((file, index) => (
          <tr key={index} className="relative group">
            <td className="text-left text-white flex items-center gap-2">
              <div
                className="cursor-pointer"
                onClick={() => GetFileView(file.file)}
              >
                {getFileIcon(file.type.split("/")[1])}
                {file.name}
              </div>
            </td>
            <td className="text-left text-white">{file.type.split("/")[1]}</td>
            <td className="text-left text-white">
              {formatDate(file.createdAt)}
            </td>
            <td className="text-left">
              <div className="flex justify-end items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="px-2 py-1 text-blue-500 hover:text-blue-700">
                  <Pencil />
                </button>
                <button
                  onClick={() => {
                    Delete(file.$id);
                  }}
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
                    className="px-2 py-1 text-green-500 hover:text-green-700"
                  >
                    <StarOff color="gold" />
                  </button>
                ) : (
                  <button
                    onClick={() => StarFile(file.$id)}
                    className="px-2 py-1 text-green-500 hover:text-green-700"
                  >
                    <Star color="gold" />
                  </button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FileTable;
