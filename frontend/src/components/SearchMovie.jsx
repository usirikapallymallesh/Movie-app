import axios from "axios";
import React, { useState } from "react";
import { options, SEARCH_MOVIE } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setSearchMovieDetails } from "../redux/SearchSlice";
import { setLoading } from "../redux/userSlice";
import MovieList from "./MovieList";
import toast from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";
const SearchMovie = () => {
  const [searchMovie, setSearchMovie] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.app.loading);
  const { movieName, searchedMovie } = useSelector(
    (store) => store.SearchMovie
  );

  // console.log(searchedMovie);

  const submitHandler = async (e) => {
    e.preventDefault();
    if(searchMovie==='') {
      toast.error("Please enter a movie name");
      return;
    }
    dispatch(setLoading(true));
    try {
      const res = await axios.get(
        `${SEARCH_MOVIE}${searchMovie}&include_adult=false&language=en-US&page=1`,
        options
      );
      // console.log(res.data.results); // will contain the movie data if found else will be null or an error object.
      const movie = res?.data?.results;
      dispatch(setSearchMovieDetails({ searchMovie, movie }));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
    setSearchMovie(""); // clear the search input after the search is done.

    // call movie API with search movie
    // alert(movieSearch)
  };
  return (
    <>
      <div className="flex justify-center sm:pt-[10%] pt-14">
        <form onSubmit={submitHandler} className="sm:w-[50%] w-[100%] px-2">
          <div className="flex justify-between shadow-md  rounded-lg w-[100%] p-2 px-4">
            <input
              value={searchMovie}
              onChange={(e) => setSearchMovie(e.target.value)}
              className="w-full outline-none rounded-md text-lg"
              type="text"
              placeholder="search movies ..."
            />
            <button className="bg-red-800 text-white rounded-md px-4 py-2">
            {
                loading? (
                  <ColorRing
                    visible={true}
                    height="30"
                    width="30"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={[
                      "#e15b64",
                      "#f47e60",
                      "#f8b26a",
                      "#abbd81",
                      "#849b87",
                    ]}
                  />
                ) : (
                  ""
                )
              }
              {loading ? "" : "Search"}
            </button>
          </div>
        </form>
      </div>
      <div className="text-black ">
        {searchedMovie !== null ? (
          <MovieList
            title={movieName}
            searchMovie={true}
            movie={searchedMovie}
          />
        ) : (
          <div>
            <h1>No movies found</h1>
          </div>
        )}
        {/*  */}
      </div>
    </>
  );
};

export default SearchMovie;
