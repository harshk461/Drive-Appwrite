"use client";

import { UploadFileInFolder } from "@/actions/folder/folder";
import { getUser } from "@/Utils/appwrite";
import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function NewFile({
  setFiles,
  folderId,
  setIsOpen,
}: {
  setIsOpen: Function;
  folderId: string | null;
  setFiles: Function | null;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Login First");
      return;
    }
    setLoading(true);
    if (file && email.trim() !== "") {
      try {
        const response = await UploadFileInFolder({
          folderId,
          file,
          name,
          email,
        });

        if (response && setFiles) {
          setFiles((prevFiles: any) => [...prevFiles, response]);
        }

        setIsOpen(false);
      } catch (error) {
        console.log("Error uploading file: ", error);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      const email = userData?.email ?? "";
      setEmail(email);
      setUser(user);
    };

    fetchUser();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
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
        <h1 className="text-center text-2xl font-semibold">Add New File</h1>
        <input
          className="w-full p-2 border-2 border-gray-300 rounded-lg outline-none
          dark:bg-transparent dark:border-2 dark:border-[#37393B]"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name of File"
        />

        <input
          id="picture"
          type="file"
          onChange={handleFileChange}
          className="flex h-10 w-full rounded-lg border border-input bg-white px-3 py-2 text-md text-gray-400 file:border-0 
              file:bg-transparent file:text-gray-600 file:text-sm file:font-medium dark:bg-transparent dark:border-2 dark:border-[#37393B]"
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
