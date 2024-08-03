import { GetFileView } from "@/actions/file/file";
import { EllipsisVertical, Pencil, Trash, Download } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
  FaFileImage,
  FaFileAlt,
} from "react-icons/fa";

interface FileBoxProps {
  file: string;
  $id: string;
  name: string;
  type: string;
  createdAt: string;
  url: string;
}

const FileBox: React.FC<FileBoxProps> = ({
  file,
  $id,
  name,
  type,
  createdAt,
  url,
}) => {
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

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleMenuClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
  };

  return (
    <div className="w-full md:w-[250px] p-3 rounded-lg flex flex-col bg-gray-400 gap-2">
      <div className="flex justify-between items-center">
        <div
          onClick={() => GetFileView(file)}
          className="flex items-center gap-2"
        >
          {getFileIcon(type.split("/")[1])}
          {name}
        </div>
        <div ref={menuRef} className="relative">
          <button
            onClick={() => handleMenuClick(2)}
            className="text-gray-500 hover:text-gray-700"
          >
            <EllipsisVertical color="white" />
          </button>
          {openIndex === 2 && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-300 shadow-lg rounded">
              <ul className="py-1">
                <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-blue-600">
                  <Pencil size={20} color="blue" />
                  Edit
                </li>
                <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-red-600">
                  <Trash size={20} color="red" />
                  Delete
                </li>
                <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-green-600">
                  <Download size={20} color="green" />
                  Download
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-[150px]">
        <img className="w-full h-full" src={url} alt={name} />
      </div>
      <div className="flex justify-between items-center">
        <div className="text-md">{formatDate(createdAt)}</div>
      </div>
    </div>
  );
};

export default FileBox;
