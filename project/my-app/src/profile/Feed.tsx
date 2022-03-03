import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { MdOutlineExpandMore } from 'react-icons/md';
import { Navigate, useNavigate } from 'react-router-dom';
import NewTrip from './../my_trip/newTrip';

export function Feed() {
    let [fetching,setFetch] = useState(true);
    let [userName,setUsername]=useState("");
    let [Posts, setPosts] = useState([
        { 
        category:"",
        categoryinfo:{},
        comments:[],
        description:"",
        imgUrl: "",
        likes: [],
        location:"",
        name: ""
    }
    ]);
    let url = 'http://127.0.0.1:5435/posts/allPosts';

    useEffect(() =>  {

        axios.get(url)
            .then(response => {
                const time =new Date().getTime();
                let postArr=[]
                let k=0
                for (let i = 0; i < response.data.length; i++) {
                    for (let j = 0; j < response.data[i].posts.length; j++) {
                        postArr[k] = response.data[i].posts[j];
                        k++;
                        
                    }
                }
                console.log(response.data[0].posts,time);
                console.log(postArr);
                setPosts(postArr);
                setUsername(response.data[0].userName)
                setFetch(false);
            });
    },[]);
    const time =new Date().getTime();
    console.log(Posts,time);
    
    return fetching ?(<>loadong...</>):(
        <div>
           
            {Posts.map((curr, i) => {
                
              return <Post1 key={i} userName={userName} postItem={curr} />
            })} 
           
        </div>
    )
}

const Post1 = (props: {userName:string , postItem: {category:string,categoryinfo:any,comments:Array<any>,description:string, imgUrl: string,likes:Array<any>, location:string,name: string }}) => {
    
    const navigate = useNavigate()
    let [AttractionInfo, setAttractionInfo] = useState({
        postID:"",
        cost:0,
        minAge:0,
        maxAge:0,
        season:"",
        suitableForPregnant:false,
        suitableForPeopleWithDisabilities:false,
        suitableForGroups:false,
    
      })
      let [campingInfo, setcampingInfo] = useState({
        postID:"",
        costPerNight:0,
        meals:"",
        viewTo:"",
        peoplePerRoom:0,
        includingBath:false,
        includingGrill:false,
        includingKitchen:false
    
      })
      
      let [hikingInfo, sethikingInfo] = useState({
        postID:"",
        pathLength:0,
        level:"",
        totalTime:0,
        includingClimbing:false,
        suitableStrollers:false
    
      })
      let [isOpen, setIsOpen] = useState(false)
      let [isOpenInfo, setIsOpenInfo] = useState(false)
      let [isOpenNewTrip, setisOpenNewTrip] = useState(false)
      useEffect(() =>  {
        if(props.postItem.category==="hiking"){
            sethikingInfo(props.postItem.categoryinfo);
        }
        if(props.postItem.category==="camping"){
            setcampingInfo(props.postItem.categoryinfo);
        }
        if(props.postItem.category==="attraction"){
            setAttractionInfo(props.postItem.categoryinfo);
        }
        
    },[]);
    return (<div>
        {isOpenNewTrip && <NewTrip postItem={props.postItem}></NewTrip>}

        <div className='addmyTrips'>
            {isOpen && <button onClick={()=>{setisOpenNewTrip(!isOpenNewTrip)}} >new trip</button>}
        </div>
        <ul>
            <li>username: {props.userName} </li>
            <li> <img src={props.postItem.imgUrl} alt=""  /> </li>
            <li>name: {props.postItem.name} </li>
            <li>description: {props.postItem.description} </li>
            <li>category: {props.postItem.category} </li>
            <button onClick={()=>{setIsOpenInfo(!isOpenInfo)}}><MdOutlineExpandMore /></button>
            {isOpenInfo&&
            <div className='categoryInfo'>
                <div className='camping_info'>
                    <li> {props.postItem.category==="camping"&& <h4>costPerNight</h4>} </li>
                    <li> {props.postItem.category==="camping"&& campingInfo.costPerNight} </li>
                    <li> {props.postItem.category==="camping"&& <h4>meals</h4>} </li>
                    <li> {props.postItem.category==="camping"&& campingInfo.meals} </li>
                    <li> {props.postItem.category==="camping"&& <h4>viewTo</h4>} </li>
                    <li> {props.postItem.category==="camping"&& campingInfo.viewTo} </li>
                    <li> {props.postItem.category==="camping"&& <h4>peoplePerRoom</h4>} </li>
                    <li> {props.postItem.category==="camping"&& campingInfo.peoplePerRoom} </li>
                    <li> {props.postItem.category==="camping"&& <h4>includingBath</h4>} </li>
                    <li> {props.postItem.category==="camping"&& campingInfo.includingBath} </li>
                    <li> {props.postItem.category==="camping"&& <h4>includingGrill</h4>} </li>
                    <li> {props.postItem.category==="camping"&& campingInfo.includingGrill} </li>
                    <li> {props.postItem.category==="camping"&& <h4>includingKitchen</h4>} </li>
                    <li> {props.postItem.category==="camping"&& campingInfo.includingKitchen} </li>
                </div>
                <div className='hiking_info'>
                    <li> {props.postItem.category==="hiking"&& <h4>pathLength</h4>} </li>
                    <li>{props.postItem.category==="hiking"&& hikingInfo.pathLength} </li>
                    <li> {props.postItem.category==="hiking"&& <h4>level</h4>} </li>
                    <li> {props.postItem.category==="hiking"&& hikingInfo.level} </li>
                    <li> {props.postItem.category==="hiking"&& <h4>totalTime</h4>} </li>
                    <li> {props.postItem.category==="hiking"&& hikingInfo.totalTime} </li>
                    <li> {props.postItem.category==="hiking"&& <h4>includingClimbing</h4>} </li>
                    <li> {props.postItem.category==="hiking"&& hikingInfo.includingClimbing} </li>
                    <li> {props.postItem.category==="hiking"&& <h4>suitableStrollers</h4>} </li>
                    <li> {props.postItem.category==="hiking"&& hikingInfo.suitableStrollers} </li>
                </div>
                <div className='attraction_info'>
                    <li> {props.postItem.category==="attraction"&& <h4>cost</h4>} </li>
                    <li>  {props.postItem.category==="attraction"&& AttractionInfo.cost} </li>
                    <li> {props.postItem.category==="attraction"&& <h4>minAge</h4>} </li>
                    <li> {props.postItem.category==="attraction"&& AttractionInfo.minAge} </li>
                    <li> {props.postItem.category==="attraction"&& <h4>maxAge</h4>} </li>
                    <li> {props.postItem.category==="attraction"&& AttractionInfo.maxAge} </li>
                    <li> {props.postItem.category==="attraction"&& <h4>season</h4>} </li>
                    <li> {props.postItem.category==="attraction"&& AttractionInfo.season} </li>
                    <li> {props.postItem.category==="attraction"&& <h4>suitableForPregnant</h4>} </li>
                    <li> {props.postItem.category==="attraction"&& AttractionInfo.suitableForPregnant} </li>
                    <li> {props.postItem.category==="attraction"&& <h4>suitableForPeopleWithDisabilities</h4>} </li>
                    <li> {props.postItem.category==="attraction"&& AttractionInfo.suitableForPeopleWithDisabilities} </li>
                    <li> {props.postItem.category==="attraction"&& <h4>suitableForGroups</h4>} </li>
                    <li> {props.postItem.category==="attraction"&& AttractionInfo.suitableForGroups} </li>
                </div>
            </div>
            }
        </ul>
    
        <button onClick={()=>{setIsOpen(!isOpen)}}>add to my trip</button>
    </div>)
}




