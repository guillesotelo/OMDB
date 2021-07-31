import { configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"

//imports de los reducers.js
import userReducer from "./user"
import moviesReducer from "./movies"
import favoritesReducer from "./favorites"

const store = configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
    .concat(logger),
    reducer: {
        //reducers
        user: userReducer,
        movies: moviesReducer,
        favorites: favoritesReducer
    }
})

export default store