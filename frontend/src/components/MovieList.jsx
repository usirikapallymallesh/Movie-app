import React from "react";
import MovieCard from "./MovieCard";
const MovieList = ({ title, movie, searchMovie = false }) => {
  // console.log(movie);

  if (movie === null) {
    return ;
  }

  return (
    <div className="sm:px-8 px-2">
      <h1
        className={`${
          searchMovie ? "text-black" : "text-white"
        } sm:text-3xl text-medium py-4 px-2 `}
      >
        {title}
      </h1>
      <div className="flex overflow-x-auto no-scrollbar cursor-pointer">
        <div className=  {`${
          searchMovie ? "grid sm:grid-cols-9 grid-cols-2 gap-5 px-5 sm:px-2" : "flex items-center gap-1"
        }  `} >
          {movie.map((movie, index) => (
            <MovieCard key={movie.id} movieId={movie.id} posterPath={movie?.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
