import React from 'react';
import { MyTripsActions } from './myTripsArr';
import { MyTripsfunc } from './myTripsHelper';
import { Outlet } from 'react-router-dom';

export  function MyTrip () {
  return (
  <div className='myTripPage'>
      <MyTripsfunc myTripactionsArr={MyTripsActions}/>
      <Outlet/>
  </div>
  
  )
}
