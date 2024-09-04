import React, { useEffect } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainContainer from "./MainContainer";
import MovieContainer from "./MovieContainer";
import axios from "axios";
import { NOW_PLAYING_MOVIE_API, options } from "../utils/constants";
import { useDispatch } from "react-redux";
import { getNowPlayingMovies } from "../redux/MovieSlice";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useUpComingMovies from "../hooks/useUpComingMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import SearchMovie from "./SearchMovie";

const Browse = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.app.user);
  // console.log(user);

  const toggle = useSelector((state) => state.movie.toggle);
  // const dispatch = useDispatch();
  // custom hooks
  useNowPlayingMovies();
  usePopularMovies();
  useUpComingMovies();
  useTopRatedMovies();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    // return null; // Retur
  }, []);

  return (
    <div>
      <Header />
      <div >
        {toggle ? (
          <SearchMovie />
        ) : (
          <>
            <MainContainer />
            <MovieContainer />
          </>
        )}
      </div>
    </div>
  );
};

export default Browse;
