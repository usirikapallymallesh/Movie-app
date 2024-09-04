import React from "react";
import useMovieById from "../hooks/useMovieById";
import { useSelector } from "react-redux";

const VideoBackground = ({ id,bool }) => {
  const trailer = useSelector((state) => state.movie.trailerMovie);
  // console.log(trailer);

  useMovieById(id);
  if (!trailer) return;
  return (
    <div className="w-[vw] overflow-hidden relative top-14 sm:top-0">
      <iframe
        className={`${bool ? "overflow-auto w-[20rem] h-[25rem] sm:w-96" : "w-screen aspect-video" } `}
        src={`https://www.youtube.com/embed/${trailer.key}?&autoplay=1&mute=1`}
        title="YouTube video player"
        frameBorder="0"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
