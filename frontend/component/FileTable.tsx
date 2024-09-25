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
import FileTile from "./FileTile";

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
        <div className="flex-[2] font-semibold">Name</div>
        <div className="flex-1  font-semibold">Type</div>
        <div className="flex-1  font-semibold">Created At</div>
        <div className="flex-1 text-right  font-semibold"></div>
      </div>
      {data.map((file, index) => (
        <FileTile key={index} file={file} />
      ))}
    </div>
  );
};

export default FileTable;
