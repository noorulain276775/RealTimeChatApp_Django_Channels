import React from 'react'
import { Link } from 'react-router-dom'

export const MyNavigate = () => {
  return (
    <div className='d-flex flex-column'>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/chat">Chat</Link>
    </div>
  )
}
