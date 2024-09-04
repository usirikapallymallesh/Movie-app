import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import movieReducer from './MovieSlice';
import searchMovieReducer from './SearchSlice';

const store =configureStore({
    reducer: {
        // Define your reducers here
        app: userReducer,
        movie: movieReducer,  // Assuming movieSlice is your movie slice file
        // Add other reducers here
        SearchMovie:searchMovieReducer
    }
})

export default store;