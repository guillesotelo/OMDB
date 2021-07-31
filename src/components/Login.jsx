import * as React from "react";
import { useDispatch } from "react-redux";
import { sendLoginRequest } from '../store/user'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import Search from "./Search";

export default function Register() {
    
  const dispatch = useDispatch()
  const [userEmail, setUserEmail] = React.useState('')
  const [userPass, setUserPass] = React.useState('')
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  const history = useHistory()

  const handleClick = (e) => {
    e.preventDefault()
    if(isLoggedIn) {
      alert(`YOU ARE ALREADY LOGGED:\n${userEmail}`)
    }else{
      let userData = {
        userEmail, 
        userPass
      }
      dispatch(sendLoginRequest(userData))
        .then(() => {
          setIsLoggedIn(true) 
          history.push('/favorites')
        })
     }
  }

  return (
    <div>
      <Search/>
      <div className='register'>
        <Link to='/' style={{ textDecoration: 'none' , paddingLeft: '20px'}}>
            <h3 className='goback'>Home</h3>
        </Link>
        <h2 className='title'>~ Login ~</h2>
        <form>
          <br />
          <input name="email" placeholder='Email' onChange={data => setUserEmail(data)} /> <br /><br />
          <input name="password" type='password' placeholder='Password'onChange={data => setUserPass(data)} /> <br /><br />
          <button type="submit" onClick={handleClick}>Login</button>
        </form>
    </div>
  </div>
  );
}