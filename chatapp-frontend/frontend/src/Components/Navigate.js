import React from 'react'
import { Link } from 'react-router-dom'

export const Navigate = () => {
  return (
    <div className='d-flex flex-column'>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
    </div>
  )
}
