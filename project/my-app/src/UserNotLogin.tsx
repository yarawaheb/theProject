import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function UserNotLogin() {
    const navigate=useNavigate()
  return (
    <div><button onClick={()=>{navigate('/login')}}>Please Login first</button></div>
  )
}
