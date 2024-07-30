"use client";

import { GetAllStarredFile } from "@/actions/file/file";
import React, { useEffect, useState } from "react";
import FileBox from "../component/FileBox";

interface File {
  $id: string;
  name: string;
  type: string;
  createdAt: string;
  previewUrl: string;
  starred: boolean;
}

export default function Starred() {
  const [data, setData] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getStarred = async () => {
      try {
        setLoading(true);
        const data = await GetAllStarredFile();
        setData(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    getStarred();
  }, []);
  return (
    <div className="w-full flex flex-col justify-center gap-4">
      <h1 className="text-center text-2xl font-bold">All Starred Files</h1>
      <div className="w-full md:w-2/3 m-auto">
        {loading && (
          <div className="w-[50px] h-[50px] rounded-full animate-spin border-4 border-gray-400 dark:border-white border-t-gray-800 dark:border-t-gray-400 m-auto"></div>
        )}
        {data.map((file, index) => (
          <FileBox
            $id={file.$id}
            key={index}
            name={file.name}
            type={file.type}
            createdAt={file.createdAt}
            url={file.previewUrl ? file.previewUrl : ""}
          />
        ))}
      </div>
    </div>
  );
}
