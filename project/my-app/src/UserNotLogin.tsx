import React from 'react'
import { useNavigate } from 'react-router-dom';
import './userNotLogin.css'
export default function UserNotLogin() {
    const navigate=useNavigate()
  return (
    <div className='notLogin'>
      <img className='notLoginImg' src="./images/logo.png" alt="" />
      <span className='notLoginSpan'>Welcome to Dream Trip</span>
      <button className='notLoginBtn' onClick={()=>{navigate('/login')}}> Login to start your journey with us</button>
    </div>
  )
}
