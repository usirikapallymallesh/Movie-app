import { getNowPlayingMovies } from "../redux/MovieSlice";
import { NOW_PLAYING_MOVIE_API,options } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";

const useNowPlayingMovies = async () =>{
    const dispatch = useDispatch();
    try {
      const res= await axios.get(NOW_PLAYING_MOVIE_API,options);
      // console.log();
      
      dispatch(getNowPlayingMovies(res.data.results))
    }
    catch (error) {
      console.error(error);
    }
  }

export default useNowPlayingMovies;
