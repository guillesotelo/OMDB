import React from "react"
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import { addToFavorites } from '../store/favorites'
import Search from "./Search";

export default function SinlgeMovie(props){

    const history = useHistory()
    const dispatch = useDispatch()
    let selectedMovie

    let movies = useSelector(store => store.movies)
    let favorites = useSelector(store => store.favorites)
    let todos = []
    if(movies.Search) todos = movies.Search.concat(favorites)
    
    if(!movies.Search && !favorites) history.push('/favorites')

   selectedMovie = todos.find(movie => movie.Title === props.moviename.name)

    const handleClick = () => {
        let movieData = {
            imdbID: selectedMovie.imdbID,
            Poster: selectedMovie.Poster,
            Title: selectedMovie.Title,
            Year: selectedMovie.Year,
            Type: selectedMovie.Type,
        }
        return dispatch(addToFavorites(movieData))
    }

    const goToFavs = () => {
        history.push('/favorites')
    }
      
    
    return (
        <div>
            <Search/>
            <Link to='/' style={{ textDecoration: 'none' , paddingLeft: '20px'}}>
                <h3 className='goback'>HOME</h3>
            </Link>
            <div className="single-movie-block">
                <div>
                    <button onClick={handleClick}>
                        + Add to Favs
                    </button>
                    <button onClick={goToFavs}>
                        Go to Favs
                    </button>
                    <div>
                        <h2 className="movie-title" style={{ padding: '0px 25px' }} >{selectedMovie.Title}</h2>
                    </div>
                    <div  style={{ display: 'flex' }}>
                        <img src={selectedMovie.Poster} alt="MoviePoster" />
                        <div style={{ alignItems: 'stretch', margin: '40px' }}>
                            <h4 >Title: {selectedMovie.Title}</h4>
                            <h4 >Year: {selectedMovie.Year}</h4>
                            <h4 >Type: {selectedMovie.Type}</h4>
                            <h5 >ID: {selectedMovie.imdbID}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
