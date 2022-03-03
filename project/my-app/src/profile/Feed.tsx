import axios from 'axios';
import { useEffect, useState } from 'react';




export function Feed() {
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
                console.log(response.data[0].posts,time);
                console.log(response.data);
                setPosts(response.data[0].posts);
                setUsername(response.data[0].userName)
            });
    },[]);
    const time =new Date().getTime();
    console.log(Posts,time);
    
    return (
        <div>
           
            {Posts.map((curr, i) => {
              return <Post1 key={i} userName={userName} postItem={curr} />
            })} 
           
        </div>
    )
}


const Post1 = (props: {userName:string , postItem: {category:string,categoryinfo:any,comments:Array<any>,description:string, imgUrl: string,likes:Array<any>, location:string,name: string }}) => {
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
        <div className='addmyTrips'>
            {isOpen && <button>new trip</button>}
        </div>
        <ul>
            <li> {props.userName} </li>
            <li> <img src={props.postItem.imgUrl} alt=""  /> </li>
            <li> {props.postItem.name} </li>
            <li> {props.postItem.description} </li>
            <li> {props.postItem.category} </li>
            <li> {props.postItem.category==="camping"&& campingInfo.meals} </li>
            <li> {props.postItem.category==="camping"&& campingInfo.costPerNight} </li>
            <li> {props.postItem.category==="camping"&& campingInfo.viewTo} </li>
        </ul>
        <button onClick={()=>{setIsOpen(!isOpen)}}>add to my trip</button>
    </div>)
}



