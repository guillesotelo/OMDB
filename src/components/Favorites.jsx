import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import MovieBlock from './MovieBlock';
import { getFavorites, removeFromFavorites } from '../store/favorites'
import Search from "./Search";

export default function Favorites() {
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getFavorites()).then(favs => favs.payload)
    },[dispatch])
    
    let favorites = useSelector(store => store.favorites)
    const user = useSelector(store => store.user)
    if(!user) favorites = []
    
    const handleClick = (movieId) => {
      // console.log("CLICK MOVIE: ",movieId)
      dispatch(removeFromFavorites(movieId))
        .then(() => dispatch(getFavorites())
        .then(favs => favs.payload))
    }

  return (
    <div>
        <Search/>
        <h2 className='title'>~ Favorites ~</h2>
        <Link to='/' style={{ textDecoration: 'none' , paddingLeft: '20px'}}>
            <h3 className='goback'>Home</h3>
        </Link>
      <div className='movie-list'> 
        {favorites.length ?
        favorites.map((movie,i) => (
          <div key={i} className='movie-block-fav'>  
          <Link  to={`/movies/${movie.Title}`} style={{ textDecoration: 'none' }}>
            <MovieBlock
              className='movie-block'
              title={movie.Title}
              posterUrl={movie.Poster}
              />
          </Link>
              <button className='remove-btn' onClick={() => handleClick(movie.imdbID)}>Remove</button>
          </div>
        )) 
        : <p>No favorites found.</p>
      }
      </div>
      </div>
  )
}