import React from 'react';
import { useNavigate } from 'react-router-dom';
import './myTrips.css'
export  function MyTripsfunc(props: {myTripactionsArr:{Icon:JSX.Element, title: string, url: string }[]}) {
  const navigate = useNavigate()
  return(
    <div className="mtactions">
    {props.myTripactionsArr.map((curr,i) =>(
      <li key={i}><button className={curr.url} onClick={() => {navigate(curr.url)}}>
           <div className="mticons">{curr.Icon}</div>
           <div>{curr.title}</div>
            </button></li>
   ))}
 </div>)
}

