import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { MdOutlineExpandMore } from 'react-icons/md';
import { Navigate, useNavigate } from 'react-router-dom';
import NewTrip from './../my_trip/newTrip';
import { ProfileUser } from './../Home/profileUser';
import { getUser, setprofileUser } from '../configStore';
import { response } from 'express';
import { AiOutlineComment } from 'react-icons/ai';


export function Feed() {
    let [fetching,setFetch] = useState(true);
    let [userNameArr,setUsername]=useState([""]);
    let [Posts, setPosts] = useState([
        { 
        postID:0,
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
                let usernameArr=[]
                let k=0
                for (let i = 0; i < response.data.length; i++) {
                    for (let j = 0; j < response.data[i].posts.length; j++) {
                        postArr[k] = response.data[i].posts[j];
                        usernameArr[k]=response.data[i].userName;
                        k++;
                        
                    }
                }
                console.log(response.data[0].posts,time);
                console.log(postArr);
                setPosts(postArr);
                setUsername(usernameArr)
                setFetch(false);
            });
    },[]);
    const time =new Date().getTime();
    console.log(Posts,time);
    
    return fetching ?(<>loadong...</>):(
        <div>
           
            {Posts.map((curr, i) => {
                
              return <Post1 key={i} userName={userNameArr[i]} postItem={curr} />
            })} 
           
        </div>
    )
}

/////////////////////////////////////////////////////////////Post1//////////////////////////////////////////////////

export const Post1 = (props: {userName:string , postItem: {postID:number,category:string,categoryinfo:any,comments:Array<any>,description:string, imgUrl: string,likes:Array<any>, location:string,name: string }}) => {
    
    const navigate = useNavigate()
    let [isEditing,setIsEditing]=useState(false)
    let [AttractionInfo, setAttractionInfo] = useState({postID:"",cost:0,minAge:0,maxAge:0,season:"",suitableForPregnant:false,suitableForPeopleWithDisabilities:false,suitableForGroups:false,})
    let [campingInfo, setcampingInfo] = useState({postID:"",costPerNight:0,meals:"",viewTo:"",peoplePerRoom:0,includingBath:false,includingGrill:false,includingKitchen:false})
    let [hikingInfo, sethikingInfo] = useState({postID:"",pathLength:0,level:"",totalTime:0,includingClimbing:false,includingWater:false,suitableStrollers:false})
    let [isOpen, setIsOpen] = useState(false)
    let [isOpenInfo, setIsOpenInfo] = useState(false)
    let [isOpenNewTrip, setisOpenNewTrip] = useState(false)
    let [isuserclick, setuserclick] = useState(false)
    let [isOpenComments,setIsOpenComments]=useState(false)
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
     let [postInfo, setPostInfo] = useState(props.postItem)
    
    function textattractionWasChanged(e: React.ChangeEvent<HTMLInputElement> |React.ChangeEvent<HTMLSelectElement>| React.ChangeEvent<HTMLTextAreaElement>,whichField: string)
      {
        let newObj = {...AttractionInfo,...{[whichField]: e.target.value}};        
        setAttractionInfo(newObj);
    }

    function textcampingWasChanged(e: React.ChangeEvent<HTMLInputElement> |React.ChangeEvent<HTMLSelectElement>| React.ChangeEvent<HTMLTextAreaElement>,whichField: string)
    {
      let newObj = {...campingInfo,...{[whichField]: e.target.value}};        
      setcampingInfo(newObj);
    }
   
    function texthikingWasChanged(e: React.ChangeEvent<HTMLInputElement> |React.ChangeEvent<HTMLSelectElement>| React.ChangeEvent<HTMLTextAreaElement>,whichField: string)
      {
        let newObj = {...hikingInfo,...{[whichField]: e.target.value}};        
        sethikingInfo(newObj);
    }
    let [categoryIsSet, setcatInfo] = useState({})

    function textWasChanged(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>,whichField: string)
      {
      if(whichField==='category'){
      setcatInfo(e.target.value);
        console.log(categoryIsSet);
        
      }
      let newObj = {...postInfo,...{[whichField]: e.target.value}};  
      setPostInfo(newObj);
      console.log(postInfo);
        
    }
    function savePost() {
      if(postInfo.category==='hiking'){
        postInfo.categoryinfo=hikingInfo;
      }
      if(postInfo.category==='camping'){
        postInfo.categoryinfo=campingInfo;
      }
      if(postInfo.category==='attraction'){
        postInfo.categoryinfo=AttractionInfo;
      }
      const username=localStorage.getItem('userNameLogged');
      console.log(postInfo);
      
      axios.put("http://localhost:5435/posts/put/"+username+'/'+postInfo.postID,postInfo)
      .then(response1 => {
          console.log(response1.data);
          navigate('/profile/myProfile')
      })
    }
    return (<div>
        {isOpenNewTrip && <NewTrip userName={props.userName} postItem={props.postItem} ></NewTrip>}

        <div className='addmyTrips'>
            {isOpen && <button onClick={()=>{setisOpenNewTrip(!isOpenNewTrip)}} >new trip</button>}
        </div>
        {props.userName===getUser().userName&&<button onClick={()=>{deletePost(props)}}>delete</button>}
        {props.userName===getUser().userName&&<button onClick={()=>{setIsEditing(!isEditing)}}>edit</button>}
        <ul>
            {setprofileUser(props.userName)}
            {isuserclick&&navigate('/profileUser')}
            <li>username: <button  onClick={()=>{setuserclick(!isuserclick)}}>{props.userName} </button> </li>
            <li> <img src={props.postItem.imgUrl} alt=""  /> </li>
            <li>name: {!isEditing ? props.postItem.name : <input onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textWasChanged(e, "name")}}
            type="text"  id="name" name="name" defaultValue={props.postItem.name} /> } </li>
            <li>location: {!isEditing ? <a href={props.postItem.location}>{props.postItem.name}</a> :<input onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textWasChanged(e, "location")}}
            type="text"  id="location" name="location"  defaultValue={props.postItem.location} /> } </li>
            <li>description:{!isEditing? props.postItem.description :<input onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textWasChanged(e, "description")}}
            type="text"  id="description" name="description" defaultValue={props.postItem.description} />} </li>
            <li>category:{!isEditing? props.postItem.category: <select defaultValue={props.postItem.category} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              textWasChanged(e, "category")
          }}>
               <option value="choose">Choose</option>
              <option value="hiking">Hiking</option>
              <option value="camping">Camping</option>
              <option value="attraction">Attraction</option>
            select category</select>} </li>
            <button onClick={()=>{setIsOpenComments(!isOpenComments)}}><AiOutlineComment /></button>
            {isOpenComments&&<h4>here will be comments</h4>}
            <button onClick={()=>{setIsOpenInfo(!isOpenInfo)}}><MdOutlineExpandMore /></button>
            {isOpenInfo&&
            <div className='categoryInfo'>
                <div className='camping_info'>
                    <li> {props.postItem.category==="camping"&& <h4>costPerNight</h4>} </li>
                    <li> {props.postItem.category==="camping"&& !isEditing? campingInfo.costPerNight :props.postItem.category==="camping"&& <input 
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textcampingWasChanged(e, "costPerNight")}}
          type="text"  id="costPerNight" name="costPerNight"  defaultValue={props.postItem.categoryinfo.costPerNight} />} </li>
                    <li> {props.postItem.category==="camping"&& <h4>meals</h4>} </li>
                    <li> {props.postItem.category==="camping"&&!isEditing? campingInfo.meals:props.postItem.category==="camping"&&<select defaultValue={props.postItem.categoryinfo.meals} 
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {textcampingWasChanged(e, "meals")}}
          >
            <option value="selfCatering">Self catering</option>
            <option value="breakfastIncluded">Breakfast included</option>
            <option value="allInclusive">All inclusive</option>
            <option value="breakfastAndLunchIncluded">Breakfast and lunch included</option>
            <option value="breakfastAndDinnerIncluded">Breakfast and dinner included</option>

          select level</select>} </li>
                    <li> {props.postItem.category==="camping"&& <h4>viewTo</h4>} </li>
                    <li> {props.postItem.category==="camping"&&!isEditing? campingInfo.viewTo:props.postItem.category==="camping"&&<input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textcampingWasChanged(e, "viewTo")}}
            type="text"  id="viewTo" name="viewTo"  defaultValue={props.postItem.categoryinfo.viewTo} />} </li>
                    <li> {props.postItem.category==="camping"&& <h4>peoplePerRoom</h4>} </li>
                    <li> {props.postItem.category==="camping"&&!isEditing? campingInfo.peoplePerRoom:props.postItem.category==="camping"&&<input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textcampingWasChanged(e, "peoplePerRoom")}}
            type="text"  id="peoplePerRoom" name="peoplePerRoom"  defaultValue={props.postItem.categoryinfo.peoplePerRoom} />} </li>
                    <li> {props.postItem.category==="camping"&& <h4>includingBath</h4>} </li>
                    <li> {props.postItem.category==="camping"&&!isEditing? campingInfo.includingBath:props.postItem.category==="camping"&&<input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textcampingWasChanged(e, "includingBath")}}
            type="checkbox" id="includingBath" name="includingBath" defaultValue={props.postItem.categoryinfo.includingBath} />} </li>
                    <li> {props.postItem.category==="camping"&& <h4>includingGrill</h4>} </li>
                    <li> {props.postItem.category==="camping"&&!isEditing? campingInfo.includingGrill:props.postItem.category==="camping"&&<input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textcampingWasChanged(e, "includingGrill")}}
            type="checkbox" id="includingGrill" name="includingGrill" defaultValue={props.postItem.categoryinfo.includingGrill} />} </li>
                    <li> {props.postItem.category==="camping"&& <h4>includingKitchen</h4>} </li>
                    <li> {props.postItem.category==="camping"&&!isEditing? campingInfo.includingKitchen:props.postItem.category==="camping"&&<input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textcampingWasChanged(e, "includingKitchen")}}
            type="checkbox" id="includingKitchen" name="includingKitchen" defaultValue={props.postItem.categoryinfo.includingKitchen} />} </li>
                </div>
                <div className='hiking_info'>
                    <li> {props.postItem.category==="hiking"&& <h4>pathLength</h4>} </li>
                    <li>{props.postItem.category==="hiking"&&!isEditing? hikingInfo.pathLength:props.postItem.category==="hiking"&&<input 
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {texthikingWasChanged(e, "pathLength")}}
          type="text"  id="pathLength" name="pathLength"  defaultValue={props.postItem.categoryinfo.pathLength} />} </li>
                    <li> {props.postItem.category==="hiking"&& <h4>level</h4>} </li>
                    <li> {props.postItem.category==="hiking"&&!isEditing? hikingInfo.level:props.postItem.category==="hiking"&&<select defaultValue={props.postItem.categoryinfo.level} 
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {texthikingWasChanged(e, "level")}}
          >
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="strenuous">Streneous</option>
          select level</select>} </li>
                    <li> {props.postItem.category==="hiking"&& <h4>totalTime</h4>} </li>
                    <li> {props.postItem.category==="hiking"&&!isEditing? hikingInfo.totalTime:props.postItem.category==="hiking"&&<input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {texthikingWasChanged(e, "totalTime")}}
            type="text"  id="totalTime" name="totalTime"  defaultValue={props.postItem.categoryinfo.totalTime} />} </li>
                    <li> {props.postItem.category==="hiking"&& <h4>includingClimbing</h4>} </li>
                    <li> {props.postItem.category==="hiking"&& !isEditing? hikingInfo.includingClimbing:props.postItem.category==="hiking"&&<input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {texthikingWasChanged(e, "includingClimbing")}}
            type="checkbox" id="includingClimbing" name="includingClimbing" defaultValue={props.postItem.categoryinfo.includingClimbing} />} </li>
            <li> {props.postItem.category==="hiking"&& <h4>includingWater</h4>} </li>
                    <li> {props.postItem.category==="hiking"&& !isEditing? hikingInfo.includingWater:props.postItem.category==="hiking"&&<input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {texthikingWasChanged(e, "includingWater")}}
            type="checkbox" id="includingWater" name="includingWater" defaultValue={props.postItem.categoryinfo.includingWater} />} </li>
                    <li> {props.postItem.category==="hiking"&& <h4>suitableStrollers</h4>} </li>
                    <li> {props.postItem.category==="hiking"&&!isEditing? hikingInfo.suitableStrollers:props.postItem.category==="hiking"&&<input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {texthikingWasChanged(e, "suitableStrollers")}}
            type="checkbox" id="suitableStrollers" name="suitableStrollers" defaultValue={props.postItem.categoryinfo.suitableStrollers} />} </li>
                </div>
                <div className='attraction_info'>
                    <li> {props.postItem.category==="attraction"&& <h4>cost</h4>} </li>
                    <li>  {props.postItem.category==="attraction"&&!isEditing? AttractionInfo.cost:props.postItem.category==="attraction"&& <input 
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textattractionWasChanged(e, "cost")}}
          type="text"  id="cost" name="cost"  defaultValue={props.postItem.categoryinfo.cost} />} </li>
                    <li> {props.postItem.category==="attraction"&& <h4>minAge</h4>} </li>
                    <li> {props.postItem.category==="attraction"&&!isEditing? AttractionInfo.minAge:props.postItem.category==="attraction"&&<input 
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textattractionWasChanged(e, "minAge")}}
          type="text"  id="minAge" name="minAge"  defaultValue={props.postItem.categoryinfo.minAge} />} </li>
                    <li> {props.postItem.category==="attraction"&& <h4>maxAge</h4>} </li>
                    <li> {props.postItem.category==="attraction"&&!isEditing? AttractionInfo.maxAge:props.postItem.category==="attraction"&&<input 
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textattractionWasChanged(e, "maxAge")}}
          type="text"  id="maxAge" name="maxAge"  defaultValue={props.postItem.categoryinfo.maxAge} />} </li>
                    <li> {props.postItem.category==="attraction"&& <h4>season</h4>} </li>
                    <li> {props.postItem.category==="attraction"&&!isEditing? AttractionInfo.season:props.postItem.category==="attraction"&&<select defaultValue={props.postItem.categoryinfo.season} 
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {textattractionWasChanged(e, "season")}}
          >
            <option value="winter">winter</option>
            <option value="spring">spring</option>
            <option value="autom">autom</option>
            <option value="summer">summer</option>
            best season</select>} </li>
                    <li> {props.postItem.category==="attraction"&& <h4>suitableForPregnant</h4>} </li>
                    <li> {props.postItem.category==="attraction"&&!isEditing? AttractionInfo.suitableForPregnant:props.postItem.category==="attraction"&&<input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textattractionWasChanged(e, "suitableForPregnant")}}
            type="checkbox" id="suitableForPregnant" name="suitableForPregnant" defaultValue={props.postItem.categoryinfo.suitableForPregnant} />} </li>
                    <li> {props.postItem.category==="attraction"&& <h4>suitableForPeopleWithDisabilities</h4>} </li>
                    <li> {props.postItem.category==="attraction"&&!isEditing? AttractionInfo.suitableForPeopleWithDisabilities:props.postItem.category==="attraction"&&<input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textattractionWasChanged(e, "suitableForPeopleWithDisabilities")}}
            type="checkbox" id="suitableForPeopleWithDisabilities" name="suitableForPeopleWithDisabilities" defaultValue={props.postItem.categoryinfo.suitableForPeopleWithDisabilities} />} </li>
                    <li> {props.postItem.category==="attraction"&& <h4>suitableForGroups</h4>} </li>
                    <li> {props.postItem.category==="attraction"&&!isEditing? AttractionInfo.suitableForGroups:props.postItem.category==="attraction"&&<input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textattractionWasChanged(e, "suitableForGroups")}}
            type="checkbox" id="suitableForGroups" name="suitableForGroups" defaultValue={props.postItem.categoryinfo.suitableForGroups} />} </li>
                </div>
            </div>
            
            }
        </ul>
        {isEditing&&<button onClick={()=>{savePost()}}>save</button>}
        <button onClick={()=>{setIsOpen(!isOpen)}} onBlur={()=>{searchForTrips(props.userName)}}>add to my trip</button>
        
    </div>)
}




async function  searchForTrips(userName: string) {
    const url="http://127.0.0.1:5435/trips/allTrips/"+userName
   await axios.get(url)
        .then(response => {
            console.log(response.data);
        });
    
    }

/////didnt try it , i need to delete all posts and add them again because i dont have postID yet
function deletePost(props: { userName: string; postItem: { postID: Number; category: string; categoryinfo: any; comments: Array<any>; description: string; imgUrl: string; likes: Array<any>; location: string; name: string; }; }) {
    const url1="http://localhost:5435/posts/deletePost/"+props.postItem.postID+"/"+props.userName;
    axios.delete(url1)
        .then(response2 => {
            console.log(response2.data);})
}

