"use client";

import { GetAllStarredFile } from "@/actions/file/file";
import React, { useEffect, useState } from "react";
import FileBox from "../../component/FileBox";
import { getUser } from "@/Utils/appwrite";
import { useUser } from "../context/context";

interface File {
  file: string;
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
  const { user } = useUser();

  useEffect(() => {
    const getStarred = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const res: any = await GetAllStarredFile();
        console.log(res);
        setData(res);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    getStarred();
  }, []);
  return (
    <div
      className="w-full p-6 h-full flex lg:flex-row flex-col items-start justify-center bg-white rounded-2xl
    dark:bg-[#131314]"
    >
      {!user ? (
        <div className="text-2xl font-semibold text-white py-8">
          Please log in to access your files.
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4">
          <h1 className="text-center text-2xl font-bold">All Starred Files</h1>
          <div className="w-full md:w-2/3 m-auto">
            {loading && (
              <div className="w-[50px] h-[50px] rounded-full animate-spin border-4 border-gray-400 dark:border-white border-t-gray-800 dark:border-t-gray-400 m-auto"></div>
            )}
            {!loading && data.length === 0 && (
              <div>
                <img
                  src="./assets/images/nodata.png"
                  alt="no data"
                  className="aspect-w-4 aspect-h-3 m-auto w-[300px] h-[300px] dark:hidden"
                />
                <img
                  src="./assets/images/nodata_dark.png"
                  alt="no data"
                  className="aspect-w-4 aspect-h-3 m-auto w-[300px] h-[300px] hidden dark:block"
                />
                <h1 className="text-lg font-semibold text-center">
                  No Data Present
                </h1>
              </div>
            )}
            {data.length > 0 &&
              data.map((file, index) => (
                <FileBox
                  file={file.file}
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
      )}
    </div>
  );
}
