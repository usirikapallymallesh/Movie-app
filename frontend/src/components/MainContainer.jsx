import React from 'react'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground'
import {useSelector} from "react-redux"

const MainContainer = () => {
  const movie = useSelector((store) =>store.movie?.popularMovies);
  if (!movie) return ;
  // console.log(movie);
  const {overview,id,title}=movie[2];
  
  return (
    <div>
        <VideoTitle title={title} overview={overview} />
        <VideoBackground id={id} />

    </div>
  )
}

export default MainContainer