import * as React from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import { registerUser } from '../store/user'
import Search from "./Search";
import { useHistory } from "react-router-dom";

export default function Register() {
    
  const dispatch = useDispatch()
  const [userEmail, setUserEmail] = React.useState('')
  const [userPass, setUserPass] = React.useState('')

  const history = useHistory()

  const handleClick = (e) => {
    e.preventDefault()
    let userData = {
      userEmail, 
      userPass
    }
    dispatch(registerUser(userData))
      .then(() => {
        alert("Registered!")
        history.push('/login')
      })
  }

  return (
    <div>
      <Search/>
      <div className='register'>
      <Link to='/' style={{ textDecoration: 'none' , paddingLeft: '20px'}}>
            <h3 className='goback'>Home</h3>
        </Link>
        <h2 className='title'>~ Register ~</h2>
        <form>
          <br />
          <input name="email" placeholder='Email' onChange={data => setUserEmail(data)} /> <br /><br />
          <input name="password" type='password' placeholder='Password'onChange={data => setUserPass(data)} /> <br /><br />
          <button type="submit" onClick={handleClick}>Register</button>
        </form>
    </div>
  </div>
  );
}