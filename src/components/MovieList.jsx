import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import MovieBlock from './MovieBlock';

export default function MovieList() {
    const movies = useSelector(store => store.movies)
    // console.log("STORE: ", movies)

  return (
      <div className='movie-list'> 
        {movies.Search ?
        movies.Search.map(movie => (
          <div key={movie.imdbID}>  
          <Link  to={`/movies/${movie.Title}`} style={{ textDecoration: 'none' }}>
            <MovieBlock
              className='movie-block'
              id={movie.imdbID}
              title={movie.Title}
              posterUrl={movie.Poster}
              />
          </Link>
          </div>
        )) 
        : <p>No movies found.</p>
      }
      </div>
  )
}