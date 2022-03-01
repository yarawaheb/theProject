import React from 'react';
import './Profile.css'
import { useNavigate } from 'react-router-dom';
export default function ProfileHelper(props: {profileactionsArr:{Icon:JSX.Element, title: string, url: string }[]}) {
   const navigate = useNavigate()
   return (
   <div className="pactions">
    {props.profileactionsArr.map((curr,i) =>(
        <li key={i}><button className={curr.url} onClick={() => {navigate(curr.url)}}>
             
             <div className="picons">{curr.Icon}</div>
             <div>{curr.title}</div>
               </button></li>
     ))}
     
  
  </div>)
  }