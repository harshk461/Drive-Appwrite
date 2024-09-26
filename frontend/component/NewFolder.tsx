"use client";

import { CreateFolder } from "@/actions/folder/folder";
import { getUser } from "@/Utils/appwrite";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function NewFolder({
  setFolders,
  parentFolder,
  setIsOpen,
}: {
  setIsOpen: Function;
  parentFolder: string | null;
  setFolders: Function | null;
}) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async () => {
    const user = await getUser();
    if (!user) {
      toast.error("Login First");
      return;
    }
    if (!name.trim()) {
      alert("Folder name cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const response = await CreateFolder(name, parentFolder);
      if (response && setFolders) {
        setFolders((prev: any) => [...prev, response]);
      }
      setIsOpen(false);
    } catch (e) {
      console.error("Failed to create folder:", e);
      alert("An error occurred while creating the folder.");
    } finally {
      setLoading(false);
    }
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
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div
        ref={dropdownRef}
        className="w-full md:w-[600px] py-8 px-6 rounded-lg bg-white dark:bg-[#131314] flex flex-col gap-3"
      >
        <h1 className="text-center text-2xl font-semibold mb-4">New Folder</h1>
        <input
          className="w-full p-2 border-2 border-gray-300 rounded-lg outline-none
          dark:bg-transparent dark:border-2 dark:border-[#37393B]"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name of File"
        />

        <div className="flex gap-2 justify-end self-end">
          <button
            onClick={() => setIsOpen(false)}
            className="w-fit text-md font-semibold m-auto cursor-pointer transition-all  px-4 py-2 rounded-2xl hover:bg-blue-100 mt-4 duration-400
            dark:bg-transparent dark:text-blue-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="w-fit text-md font-semibold m-auto cursor-pointer transition-all  px-4 py-2 rounded-2xl hover:bg-blue-100 mt-4 duration-400
            dark:bg-transparent dark:text-blue-400"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-t-2 border-t-gray-500 rounded-full animate-spin"></div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
