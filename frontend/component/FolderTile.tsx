"use client";

import { DeleteFolder } from "@/actions/folder/folder";
import { Download, Pencil, Star, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { FaFolder } from "react-icons/fa";

export default function FolderTile({
  folder,
  setFolders,
}: {
  folder: any;
  setFolders: Function;
}) {
  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
  };
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/folder/" + folder.folderId)}
      className="flex items-center justify-between px-4 py-2 rounded-lg group hover:bg-[#e4e5e6] dark:hover:bg-gray-800"
    >
      <div className="flex-[2] flex items-center cursor-pointer">
        <FaFolder size={25} />
        <span className="pl-2">{folder.folderName}</span>
      </div>
      <div className="flex-1">Folder</div>
      <div className="flex-1">{formatDate(folder.createdAt)}</div>
      <div className="flex-1 flex justify-end items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="p-2 rounded-full text-gray-400 hover:bg-gray-300 transition-all duration-200">
          <Pencil />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevents click event from triggering the router push
            DeleteFolder({
              id: folder.$id,
              folderId: folder.folderId,
              setFolders,
            });
          }}
          className="p-2 rounded-full text-gray-400 hover:bg-gray-300 transition-all duration-200"
        >
          <Trash />
        </button>
        <button className="p-2 rounded-full text-gray-400 hover:bg-gray-300 transition-all duration-200">
          <Download />
        </button>

        <button className="p-2 rounded-full text-gray-400 hover:bg-gray-300 transition-all duration-200">
          <Star />
        </button>
      </div>
    </div>
  );
}
