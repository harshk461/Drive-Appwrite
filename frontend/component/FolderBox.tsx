"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { CiMenuKebab } from "react-icons/ci";
import { FaFolder } from "react-icons/fa";

export default function FolderBox({ folder }: { folder: any }) {
  const router = useRouter();
  return (
    <div
      className=" rounded-xl bg-[#F0F4F9] flex justify-between items-center
  px-6 py-4 cursor-pointer dark:bg-[#37393B] dark:hover:bg-[#292a2c]"
    >
      <div
        onClick={() => router.push("/folder/" + folder.folderId)}
        className="flex gap-4 items-center"
      >
        <FaFolder size={25} />
        <h1 className="text-lg font-semibold">{folder.folderName}</h1>
      </div>
      <div className="cursor-pointer">
        <CiMenuKebab size={25} />
      </div>
    </div>
  );
}
