import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center">
      <div className=" max-w-full m-0 sm:m-10 bg-white dark:bg-transparent sm:rounded-lg flex justify-center flex-1 shadow-lg rounded-lg">
        <div className="lg:w-1/2 xl:w-5/12 sm:p-12 p-2 dark:bg-gray-800 w-full m-2">
          {children}
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          {/* <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg');",
            }}
          ></div> */}
        </div>
      </div>
    </div>
  );
}
