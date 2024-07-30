"use client";

import { AddNewFile } from "@/actions/file/file";
import { account, getUser } from "@/Utils/appwrite";
import React, { useState, useEffect, useRef } from "react";
import { CgClose } from "react-icons/cg";

export default function NewFile({ setIsOpen }: { setIsOpen: Function }) {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    if (file) {
      await AddNewFile({ file, name, email });
      setIsOpen(false);
    }
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setEmail(userData?.email);
    };

    fetchUser();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <CgClose
        color="white"
        className="absolute top-10 right-10 cursor-pointer"
        size={30}
        onClick={() => setIsOpen(false)}
      />
      <div className="w-full md:w-[600px] p-4 rounded-lg bg-white flex flex-col gap-3">
        <h1 className="text-center text-2xl font-semibold">Add New File</h1>
        <input
          className="w-full p-2 border-2 border-gray-300 rounded-lg"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name of File"
        />

        <input
          id="picture"
          type="file"
          onChange={handleFileChange}
          className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 
              file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
        />

        <button
          onClick={handleSubmit}
          className="w-fit m-auto cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg mt-4"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-t-2 border-t-gray-500 rounded-full animate-spin"></div>
          ) : (
            "Button"
          )}
        </button>
      </div>
    </div>
  );
}
