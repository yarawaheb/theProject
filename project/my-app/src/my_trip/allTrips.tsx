import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function AllTrips() {
    const username=localStorage.getItem('userNameLogged');
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
    let url = 'http://127.0.0.1:5435/trips/allTrips/'+username;

    useEffect(() =>  {
        axios.get(url)
            .then(response => {
                setTrips(response.data);
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
    let [tripToPlan,setTripToPlan]=useState(false)
    return(
        <div className='tripCard'>
            {tripToPlan?<Trip trip={props.trip}/>:
            <button onClick={()=>{setTripToPlan(!tripToPlan)}}>
            <span>{props.trip.Name}  </span>
            <span>{props.trip.days} days  </span>
            <span>{props.trip.members.length} members  </span>
            <span>created by: {props.trip.planner}  </span></button>
            }
        </div>
    )
}

function Trip(props:{trip:{tripId:number,Name: string,planner:string,days:number,posts:Array<any>,members:Array<string>,equipmentList:Array<any>}}){
    let arr=[]
    for (let i = 0; i < props.trip.days; i++) {
        arr[i] = i;
        
    }
    let [posts,setPosts]=useState(props.trip.posts)
    return(
        <div>
           {props.trip.Name}
           {posts.map((curr,i)=>{
               return <div key={i}>
                <ul>
                    <li> {curr.name}</li>
                </ul>
               </div>
           })}
           {console.log(props.trip.days)}
            <ul>{arr.map((e, i) => {
                return <li key={i}>day {e+1}</li>
            })}</ul>
        </div>
    )
}

function PostCard(props:{postItem:{postID:number,category:string,categoryinfo:any,comments:Array<any>,description:string, imgUrl: string,likes:Array<any>, location:string,name: string}}){
    return(
        <div>
            {props.postItem.name}
            {console.log(props.postItem.name)}
            <h1>hi</h1>
        </div>
    )
}