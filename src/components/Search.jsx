import * as React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import { getMovies } from '../store/movies'
import { sendLogOutRequest } from '../store/user'


export default function Search() {
    
    const dispatch = useDispatch()
    const [moviename, setmovieName] = React.useState("")
    const history = useHistory()

    const handleSearch = () => {
      dispatch(getMovies(moviename))
      history.push('/')
    }

    const handleClick = () => {
      dispatch(sendLogOutRequest())
      history.push('/')
    }

  return (
    <div  className='searchBar'>
      <input className='input-search' placeholder="Search movie..." onChange={data => setmovieName(data)}/>
      <button className='search-btn' type='button' moviename={moviename} onClick={handleSearch} >Search</button>
      <div className='log'>
      <Link to='/users'>
            <button className='register-btn' type='button' >Users</button>
        </Link>
        <Link to='/register'>
            <button className='register-btn' type='button' >Register</button>
        </Link>
        <Link to='/login'>
            <button className='login-btn' type='button' >Login</button>
        </Link>
        <Link to='/'>
            <button className='logout-btn' type='button' onClick={handleClick}>LogOut</button>
        </Link>
      </div>
    </div>
  );
}