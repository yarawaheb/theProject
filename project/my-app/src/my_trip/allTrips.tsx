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
    
    let [posts,setPosts]=useState(props.trip.posts)
    return(
        <div>
           {props.trip.Name}
           {posts.map((curr,i)=>{
               <div key={i}>
                  return <PostCard postItem={curr}/>
               </div>
           })}
        </div>
    )
}

function PostCard(props:{postItem:{postID:number,category:string,categoryinfo:any,comments:Array<any>,description:string, imgUrl: string,likes:Array<any>, location:string,name: string}}){
    return(
        <div>
            {props.postItem.name}
            <h1>hi</h1>
        </div>
    )
}