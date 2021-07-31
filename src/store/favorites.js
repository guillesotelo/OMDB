import axios from "axios"
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit"

//---------FAVORITES---------

export const getFavorites = createAsyncThunk("GET_FAVORITES", (id) => {
    // console.log("MOVIE NAME: ",movieName.target.value)
    if(id) return axios.get(`/api/favorites?userId=${id}`).then((res) => res.data)
    return axios.get("/api/favorites").then((res) => res.data)
    //get: api/movies
  })
  
  export const addToFavorites = createAsyncThunk(
    "ADD_TO_FAVORITES",
    ({ userId, imdbID, Poster, Title, Year, Type }, thunkAPI) => {
      const { user } = thunkAPI.getState();
      if (!user.data.id) throw new Error("You need to be logged in")
      return axios
        .post(`/api/favorites?userId=${user.data.id}`, {
            userId: userId, 
            imdbID: imdbID,
            Poster: Poster,
            Title: Title,
            Year: Year,
            Type: Type
        })
        .then((res) => res.data)
    }
  )
  
  export const removeFromFavorites = createAsyncThunk(
    "REMOVE_FROM_FAVORITES",
    (movieId, thunkAPI) => {
      const { user } = thunkAPI.getState();
      if (!user.data) throw new Error("You need to be logged in")
      return axios
        .delete(`/api/favorites?userId=${user.data.id}&movieId=${movieId}`)
        
    }
  )
  

const favoritesReducer = createReducer([], {
    [getFavorites.fulfilled]: (state, action) => action.payload,
    [addToFavorites.fulfilled]: (state, action) => action.payload,
    [removeFromFavorites.fulfilled]: (state, action) => action.payload,
})

export default favoritesReducer;