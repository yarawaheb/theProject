import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdOutlineExpandMore } from 'react-icons/md';
import { RiMore2Fill } from 'react-icons/ri';
import { getUser } from '../configStore';
import './joinTrip.css'
export default function JoinTrip() {
    let [fetching,setFetch] = useState(true);
    let [trips, setTrips] = useState([
        { 
            tripId:0,
            Name: "",
            planner:"",
            days:0,
            posts:[{}],
            members:[""],
            equipmentList:[{}]
    }
    ]);
    let url = 'http://127.0.0.1:5435/trips/allTheTrips';

    useEffect(() =>  {
        axios.get(url)
            .then(response => {
                let tripArr=[]
                let k=0
                console.log(response.data);
                for (let i = 0; i < response.data.length; i++) {
                    for (let j = 0; j < response.data[i].trips.length; j++) {
                        tripArr[k] = response.data[i].trips[j];
                        k++
                    }
                    
                    
                }
                console.log(tripArr);
                setTrips(tripArr);
                setFetch(false);
            });
    },[]);
    
    return fetching ?(<><img className='loading' src="./images/loading.gif" alt="" /></>):(
        <div className='ulTrips'>
           
            {trips.map((curr, i) => {
                
              return <TripCard key={i}  trip={curr} />
            })} 
           
        </div>
    )
}

function TripCard(props:{trip:{tripId:number,Name: string,planner:string,days:number,posts:Array<any>,members:Array<string>,equipmentList:Array<any>}}){
    let [places,setPlaces]=useState(false)
    let [more, setMore] = useState(false)
    let [membersLength,setMembersLength]=useState(props.trip.members.length)
    function jointhetrip() {
        axios.put("http://127.0.0.1:5435/trips/join/"+props.trip.planner+"/"+props.trip.tripId,{member:localStorage.getItem('userNameLogged')})
            .then(response => {
                setMembersLength(membersLength++);
                setMembersLength(membersLength++);
                //alert(response.data)
            });
    }
    return(
        <div className='JointripCard'>
            <ul className='JointripCardUL'>
               <li> <span className='tripCardName'>{props.trip.Name}  </span></li>
               <li><span>{props.trip.days} days  </span></li>
               <li ><span className='membersDiv'>{membersLength} members { <MdOutlineExpandMore className='moreIcontrip' onClick={()=>{setMore(!more)}}></MdOutlineExpandMore>}</span></li>
               {more?props.trip.members.map((curr,i)=>{
                   return <span>{curr}</span>
               }):""}
               <li><span>created by: {props.trip.planner}  </span></li>
               <li><button className='placesBtn' onClick={()=>{setPlaces(!places)}}>{props.trip.posts.length} Places</button></li>
               
                {props.trip.posts.map((curr,i)=>{
                return <li>{places?<span key={i}>place {i+1} {curr.name}  </span>:""}</li>
                })} 
                <li><button className='joinBtn' onClick={()=>jointhetrip()}>Join</button></li>
            </ul>
        </div>
    )
}
