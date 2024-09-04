import React from "react";
import { POSTER_PATH } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setId, setOpen } from "../redux/MovieSlice";
const MovieCard = ({ posterPath,movieId }) => {
  const dispatch = useDispatch();
  if (!posterPath) return;

  const handleOpen = () => {
    console.log(movieId,posterPath);
    
    dispatch(setId(movieId))
    dispatch(setOpen(true));
  };

  return (
    <div className="w-40 pr-2 sm:48" onClick={handleOpen}>
      <img src={`${POSTER_PATH}/${posterPath}`} alt="movie banner" />
    </div>
  );
};

export default MovieCard;
