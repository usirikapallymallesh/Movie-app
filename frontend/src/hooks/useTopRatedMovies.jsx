import axios from "axios"
import { options, POPULAR_MOVIE_API, TOP_RATED_MOVIE_API } from "../utils/constants";
import { useDispatch } from "react-redux";
import {  getTopRatedMovies } from "../redux/MovieSlice";



const   useTopRatedMovies= async ()=>{
    const dispatch =useDispatch();
    try{
        const res= await axios.get(TOP_RATED_MOVIE_API,options);
        dispatch(getTopRatedMovies(res.data.results))
    }catch(err){
       console.log(err);
       
    }

}

export default useTopRatedMovies ;