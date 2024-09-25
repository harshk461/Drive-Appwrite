"use client";

import { File } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

type FileType = {
  value: string;
  label: string;
  icon: JSX.Element;
};

type CustomDropdownProps = {
  fileTypes: FileType[];
  title: string;
  setValue: (value: FileType | null) => void;
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  fileTypes,
  title,
  setValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFileType, setSelectedFileType] = useState<FileType | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFileTypeSelect = (fileType: FileType) => {
    setSelectedFileType(fileType);
    setValue(fileType); // Set the selected value in the parent component
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block w-42" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full px-6 py-2 text-gray-700 bg-[#E9EEF6] rounded-full dark:bg-gray-800 dark:border-none"
      >
        <span className="flex items-center">
          {selectedFileType ? (
            <>
              {selectedFileType.icon}
              {selectedFileType.label}
            </>
          ) : (
            <div className="flex gap-2">
              {<File />}
              {title}
            </div>
          )}
        </span>
        <FaChevronDown className="w-3 h-3 ml-2" />
      </button>
      {isOpen && (
        <div className="absolute left-0 z-10 w-full mt-2 rounded-md shadow-lg bg-white">
          {fileTypes.map((fileType) => (
            <div
              key={fileType.value}
              onClick={() => handleFileTypeSelect(fileType)}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200"
            >
              {fileType.icon}
              {fileType.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
