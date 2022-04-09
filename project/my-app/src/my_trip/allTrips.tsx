import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import "./allTrips.css"
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
    
    return fetching ?(<><img className='loading' src="./images/loading.gif" alt="" /></>):(
        <div className='tripCards'>
           
            {trips.map((curr, i) => {
                
              return <TripCard key={i}  trip={curr} />
            })} 
           
        </div>
    )
}

function TripCard(props:{trip:{tripId:number,Name: string,planner:string,days:number,posts:Array<any>,members:Array<string>,equipmentList:Array<any>}}){
    let [tripToPlan,setTripToPlan]=useState(false)
    return(
        <div className={tripToPlan?'tripCard':'noTripToPlan'}>
            
            <ul className={tripToPlan?'tripCardUL':'noTripToPlanUL'}>
                <li><span className='tripCardName'>{props.trip.Name}  </span></li>
                <li><span>{props.trip.days} days  </span></li>
                <li> <span>{props.trip.posts.length} places  </span></li>
                <li><span>{props.trip.members.length} members  </span></li>
                <button className='planYourTripBtn' onClick={()=>{setTripToPlan(!tripToPlan)}}>{!tripToPlan?'Plan your trip':'Exit'}</button>
            </ul>
            {tripToPlan&&<Trip trip={props.trip}/>}
        </div>
    )
}
export const ItemTypes = {
    POST: 'post'
  }
  interface firstObject{name:string}


function Trip(props:{trip:{tripId:number,Name: string,planner:string,days:number,posts:Array<any>,members:Array<string>,equipmentList:Array<any>}}){

    let [posts,setPosts]=useState(props.trip.posts)
    return(
        <DndProvider backend={HTML5Backend}>
        <div>
           <TripHelper trip={props.trip}/>
        </div></DndProvider>
    )
}
function TripHelper(props:{trip:{tripId:number,Name: string,planner:string,days:number,posts:Array<any>,members:Array<string>,equipmentList:Array<any>}}){
    let [posts,setPosts]=useState(props.trip.posts)
    return(
        <React.Fragment>
        <div className='tripPlanner'>
          <ul className='placesDiv'> {posts.map((curr,i)=>{
                    return <div  key={i}>
                     <li> <TripIMG key={i} post={curr} /></li>

                    </div>
                })}</ul>
            <TripBox trip={{days: props.trip.days}} />
        </div></React.Fragment>)
}
function TripBox(props:{trip:{days:number}}){
    // const [{ canDrop, isOver }, drop] = useDrop(() => ({
    //     accept: ItemTypes.POST,
    //     drop: () => ({ name: "Dustbin" }),
    //     collect: (monitor) => ({
    //       isOver: monitor.isOver(),
    //       canDrop: monitor.canDrop()
    //     })
    //   }));
    let arr=[]
    for (let i = 0; i < props.trip.days; i++) {
        arr[i] = i;
    }
    const [basket, setBasket] = useState([{name:"yara"}])
    const [{ canDrop,isOver }, drop] = useDrop({
        accept: ItemTypes.POST,
        drop: (item:{ name:string}) => {
            //setIsDropping(!isDropping)
            setBasket(!basket.includes(item) ? [...basket, item] : basket)},
            collect: (monitor) => ({
                      isOver: monitor.isOver(),
                      canDrop: monitor.canDrop()
                    })
    }
    )
  
    const isActive = canDrop && isOver;
    const handleDrop = (index: number, item:React.DragEvent<HTMLLIElement>) => {
          console.log(index,item);
          console.log(basket);
          
    }
    return(
        <div >
             <span className='dragSentence'>{isActive ? "Release to drop" : "Drag each place to the relevant day" }</span>
            <ul ref={drop} role={"Dustbin"} className='daysUL'>
                {arr.map((e, i) => {
                return <li ref={drop} role={"Dustbin"}  /*onDrop={(e)=>{handleDrop(i,e)}}*/
                className='dayBlock'  key={i}>Day {e+1} 
                {/* {isOver&&basket.map((curr,index)=>{return <span key={index}>{curr.name}</span>})} */}
                </li>
                
            })}            
            </ul>
        </div>
    )
}

function TripIMG(props:{post:{name:string,imgUrl:string}}){
    
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.POST,
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }))
    return(
            <div>
               <span className='placeNameToDrag' ref={drag}
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    fontSize:20,
                    fontWeight: 'bold',
                    cursor: 'move',
            }} >{props.post.name} </span>
            {/* {console.log(props.post.imgUrl)            }
              <img ref={drag} style={{
                    opacity: isDragging ? 0.5 : 1,
                    height:10 ,
                    width:10,
                    cursor: 'move',
            }} src={props.post.imgUrl} alt="" /> */}
            </div>
   
    )
}