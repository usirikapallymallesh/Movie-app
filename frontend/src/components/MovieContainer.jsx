import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";
const MovieContainer = () => {
  const movie = useSelector((store) => store.movie);
  // console.log(movie);

  return (
    <div className="bg-black relative mt-12 sm:mt-0">
      <div className=" relative z-20 sm:-mt-52">
        <MovieList title={"Popular Movies"} movie={movie.popularMovies} />
       <MovieList title={"Now Playing Movies"} movie={movie.nowPlayingMovies} />  
       <MovieList title={"Top Rated Movies"} movie={movie.topRatedMovies} />
        <MovieList title={"UpComing Movies"} movie={movie.upComingMovies} /> 
      </div>
    </div>
  );
};

export default MovieContainer;
