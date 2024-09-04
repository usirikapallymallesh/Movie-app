import React from "react";
import { FaPlay } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";

const VideoTitle = ({title,overview}) => {
  return (
    <div className="absolute text-white pt-[18%] p-12 w-[vw] aspect-video  z-10 hidden sm:block">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="w-1/3 mt-4">
       {overview}
      </p>
      <div className="mt-8 flex gap-2 ">
        <button className="px-6 py-2 bg-white text-black rounded-sm hover:opacity-80 flex items-center gap-1">
          <FaPlay size={15} />
          <span> Play</span>
        </button>
        <button className="px-6 py-2 bg-gray-600 opacity-90  text-black rounded-sm hover:opacity-80 flex items-center gap-1">
          <CiCircleInfo size={24} />
          <span> watch More</span>
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
