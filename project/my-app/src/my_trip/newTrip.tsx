import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useEffect } from 'react';

export default function NewTrip(props:{userName:string ,postItem:{name:String,location:String,imgUrl:String,description:String,category:String}}) {
    console.log(props);
    let [nextId,setNext]=useState(0);
    let [formInfo, setFormInfo] = useState({
        tripId:nextId,
        Name: "",
        planner:localStorage.getItem('userNameLogged'),
        days:0,
        posts:[props.postItem],
        members:[props.userName],
        equipmentList:{},

        })
    useEffect(() =>  {
        const url="http://127.0.0.1:5435/trips/allTrips/"+localStorage.getItem('userNameLogged')
        axios.get(url)
            .then(response => {
                setNext(response.data+1);
                console.log(response.data);
                console.log(formInfo);
                
            });
    },[]);



    function textWasChanged(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,whichField: string)
    {
        let newObj = {...formInfo,...{[whichField]: e.target.value}};
        setFormInfo(newObj);
        console.log(formInfo);
        
    }

    function newTrip(e: React.FormEvent<HTMLFormElement>) 
    {
        const url="http://127.0.0.1:5435/trips/"+localStorage.getItem('userNameLogged')
        axios.put(url,formInfo)
            .then(response => {
                console.log(response.data);
            });
    }
  return (
    <div className='newTripForm'>
    <form  className='thenewTripForm' id="newTripForm" onSubmit={(e) => { newTrip(e) }}>
        <div className='nameFeild'>
            <input onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textWasChanged(e, "Name")}}
            type="text"  id="Name" name="Name"  placeholder="trip name" />
        </div>
        <div className='daysFeild'>
            <input onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textWasChanged(e, "days")}}
            type="text"  id="days" name="days"  placeholder="number of days" />
        </div>
        <div className='addTripButton'><button id='addTrip' type="submit" >create trip</button></div>
    </form>
</div>
  )
}
function postContext(postContext: any) {
    throw new Error('Function not implemented.');
}

