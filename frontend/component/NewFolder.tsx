import { CreateFolder } from "@/actions/folder/folder";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";

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

  const handleSubmit = async () => {
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
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="w-full md:w-[500px] px-4 py-8 rounded-lg bg-white dark:bg-gray-500 flex flex-col gap-3">
        <h1 className="text-center text-2xl font-semibold mb-4">New Folder</h1>
        <input
          className="w-full p-2 border-2 border-gray-300 rounded-lg outline-none dark:border-none dark:bg-gray-900"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name of Folder"
        />

        <div className="flex gap-2 justify-end self-end">
          <button
            onClick={() => setIsOpen(false)}
            className="w-fit m-auto cursor-pointer transition-all dark:bg-slate-900  px-4 py-2 rounded-3xl hover:bg-blue-100 mt-4 duration-400"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-t-2 border-t-gray-500 rounded-full animate-spin"></div>
            ) : (
              "Cancel"
            )}
          </button>
          <button
            onClick={handleSubmit}
            className="w-fit m-auto cursor-pointer transition-all dark:bg-slate-900  px-4 py-2 rounded-3xl hover:bg-blue-100 mt-4 duration-400"
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
