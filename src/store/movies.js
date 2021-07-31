import axios from "axios"
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit"

export const getMovies = createAsyncThunk("GET_MOVIES", (movieName) => {
  // console.log("MOVIE NAME: ",movieName.target.value)
  if(movieName)
  return axios.get(`https://www.omdbapi.com/?apikey=95069738&s=${movieName.target.value}`).then((res) => res.data)
  //get: api/movies
})

const moviesReducer = createReducer([], {
  [getMovies.fulfilled]: (state, action) => action.payload,
})

export default moviesReducer;