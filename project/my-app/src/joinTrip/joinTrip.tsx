import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getUser } from '../configStore';

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
    
    return fetching ?(<>loadong...</>):(
        <div>
           
            {trips.map((curr, i) => {
                
              return <TripCard key={i}  trip={curr} />
            })} 
           
        </div>
    )
}

function TripCard(props:{trip:{tripId:number,Name: string,planner:string,days:number,posts:Array<any>,members:Array<string>,equipmentList:Array<any>}}){
    function jointhetrip() {
        axios.put("http://127.0.0.1:5435/trips/join/"+props.trip.planner+"/"+props.trip.tripId,{member:getUser().userName})
            .then(response => {
                alert(response.data)
            });
    }
    return(
        <div className='tripCard'>
            <button onClick={()=>jointhetrip()}>Join</button>
            <span>{props.trip.Name}  </span>
            <span>{props.trip.days} days  </span>
            <span>{props.trip.members.length} members  </span>
            <span>created by: {props.trip.planner}  </span>
             {props.trip.posts.map((curr,i)=>{
               return <span key={i}>place {i+1} {curr.name}  </span>
            })} 
        </div>
    )
}
