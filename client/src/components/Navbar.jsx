import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ user }) => {

    const logout = () => {
        window.open('http://localhost:5000/auth/logout', '_self')
    }
    return (
        <div className='navbar'>
            <span className='logo'>
                <Link className='link' to='/'>
                    React App
                </Link>
            </span>
            {user ? (
                <ul className='list'>
                    <li className='listItem'>
                        <img
                            src={user.photos[0].value}
                            alt=''
                            className='avatar'
                        />
                    </li>
                    <li className='listItem'>{user.displayName}</li>
                    <li className='listItem' onClick={logout}>Logout</li>
                </ul>
            ) : (
                <span><Link to='/login' className='link'>Login</Link></span>
            )}
        </div>
    )
}

export default Navbar
