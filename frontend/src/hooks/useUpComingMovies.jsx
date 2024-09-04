import axios from "axios"
import { options, UPCOMING_MOVIE_API } from "../utils/constants";
import { useDispatch } from "react-redux";
import { getUpComingMovies } from "../redux/MovieSlice";



const  useUpComingMovies= async ()=>{
    const dispatch =useDispatch();
    try{
        const res= await axios.get(UPCOMING_MOVIE_API,options);
        dispatch(getUpComingMovies(res.data.results))
    }catch(err){
       console.log(err);
       
    }

}

export default useUpComingMovies;