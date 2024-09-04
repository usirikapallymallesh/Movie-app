import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        movieName: "",
        searchedMovie:null,

    },
    reducers: {
        setSearchMovieDetails:(state,action)=>{
            const {searchMovie,movie}=action.payload;
            state.movieName=searchMovie;
            state.searchedMovie=movie;
        },
    }
 });
  export const { setSearchMovieDetails } = searchSlice.actions;
  export default searchSlice.reducer;
