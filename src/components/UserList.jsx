import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import { getUser } from '../store/user';
import UserBlock from './UserBlock';
import Search from './Search'

export default function UserList() {

    const dispatch = useDispatch()
    const [userid, setUserId] = React.useState(0)

    useEffect(() => {
        dispatch(getUser()).then(users => users.payload)
    },[dispatch])

    const users = useSelector(store => store.user)

    const handleSearch = () => {
        dispatch(getUser(userid.target.value))
            .then(users => users.payload)
      }

  return (
      <div>
           <Search/>
           <div>
                <h2 className='title'>~ User List ~</h2>
        <input className='input-search' placeholder="Filter user ID..." onChange={data => setUserId(data)}/>
        <button className='search-btn' type='button' userid={userid} onClick={handleSearch} >Go</button>
           </div>
        <div className='movie-list'> 
            {users.length ?
            users.map(user => (
            <div key={user.id}>  
            <Link  to={`/users/${user.id}`}style={{ textDecoration: 'none' }}>
                <UserBlock
                className='user-block'
                id={user.id}
                email={user.email}
                />
            </Link>
            </div>
            )) 
            : <p>No users registered.</p>
        }
        </div>
      </div>
  )
}