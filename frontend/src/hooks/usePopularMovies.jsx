import axios from "axios"
import { options, POPULAR_MOVIE_API } from "../utils/constants";
import { useDispatch } from "react-redux";
import { getPopularMovies } from "../redux/MovieSlice";



const usePopularMovies = async ()=>{
    const dispatch =useDispatch();
    try{
        const res= await axios.get(POPULAR_MOVIE_API,options);
        dispatch(getPopularMovies(res.data.results))
    }catch(err){
       console.log(err);
       
    }

}

export default usePopularMovies;