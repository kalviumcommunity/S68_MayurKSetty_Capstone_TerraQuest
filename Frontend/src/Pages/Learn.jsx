import React from "react";

function Learn() {
  return (
    <>
      <div className="w-screen h-screen">
        <div className=" mb-10 mt-5 flex flex-row justify-center items-center">
          <h1 className=" mr-2xl text-5xl font-jersey font-bold">Learn</h1>
        </div>
        <div className="flex flex-row justify-around">
          <div className=" flex flex-col gap-10">
            <div className="w-100 h-60 bg-gray-200 rounded-4xl"></div>
            <div className="w-100 h-60 bg-gray-200 rounded-4xl"></div>
          </div>
          <div className=" flex flex-col gap-10">
            <div className="w-100 h-60 bg-gray-200 rounded-4xl"></div>
            <div className="w-100 h-60 bg-gray-200 rounded-4xl"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Learn;
