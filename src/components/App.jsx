import * as React from "react";
import { useDispatch } from "react-redux";
import Search from "./Search";
import MovieList from "./MovieList";
import { getMovies } from '../store/movies'

export default function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  return (
    <div className='app'>
          <Search/>
          <h2 className='title'>~ OMDB ~</h2>
          <MovieList/>
    </div>
  );
}