import './addPost.css'
import {PermMedia, Label,Room, EmojiEmotions} from "@material-ui/icons"
import { MdAddLocationAlt } from 'react-icons/md';
import { icons } from 'react-icons/lib';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../configStore';
import { useEffect } from 'react';

export function AddPost() {
  const navigate = useNavigate()
  let [fetching,setFetch] = useState(true);
  let [postId,setPostId]=useState(getUser().posts.length)
  let [postInfo, setPostInfo] = useState({
    postID:0,
    imgUrl: "", 
    name: "",
    description:"",
    location:"",
    category:"",
    categoryinfo:{},
    likes: [],
    comments:[],
  })
  let [AttractionInfo, setAttractionInfo] = useState({
    cost:0,
    minAge:0,
    maxAge:0,
    season:"",
    suitableForPregnant:false,
    suitableForPeopleWithDisabilities:false,
    suitableForGroups:false,

  })
  function textattractionWasChanged(e: React.ChangeEvent<HTMLInputElement> |React.ChangeEvent<HTMLSelectElement>| React.ChangeEvent<HTMLTextAreaElement>,whichField: string)
    {
      let newObj = {...AttractionInfo,...{[whichField]: e.target.value}};        
      setAttractionInfo(newObj);
  }
  let [campingInfo, setcampingInfo] = useState({
    costPerNight:0,
    meals:"",
    viewTo:"",
    peoplePerRoom:0,
    includingBath:false,
    includingGrill:false,
    includingKitchen:false

  })
  function textcampingWasChanged(e: React.ChangeEvent<HTMLInputElement> |React.ChangeEvent<HTMLSelectElement>| React.ChangeEvent<HTMLTextAreaElement>,whichField: string)
  {
    let newObj = {...campingInfo,...{[whichField]: e.target.value}};        
    setcampingInfo(newObj);
  }
  let [hikingInfo, sethikingInfo] = useState({
    pathLength:0,
    level:"",
    totalTime:0,
    includingClimbing:false,
    suitableStrollers:false

  })
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
  useEffect(()=>{
    setFetch(!fetching)
  },[])
  function sharePost(e: React.FormEvent<HTMLFormElement>) {
    setPostId(getUser().posts.length)
    e.preventDefault();
    if(categoryIsSet==='hiking'){
      postInfo.categoryinfo=hikingInfo;
    }
    if(categoryIsSet==='camping'){
      postInfo.categoryinfo=campingInfo;
    }
    if(categoryIsSet==='attraction'){
      postInfo.categoryinfo=AttractionInfo;
    }
    console.log(postInfo);
    postInfo.postID=postId;
    console.log(postInfo);
    const username=localStorage.getItem('userNameLogged');
    axios.put("http://localhost:5435/posts/"+username,postInfo)
    .then(response1 => {
        console.log(response1.data);
        navigate('/profile/myProfile')
    })
  }
  return fetching ?(<><img className='loading' src="./images/loading.gif" alt="" /></>):(
  
    <div className="share">
      <form id="personalinfor" onSubmit={(e) => { sharePost(e) }}>          
        <div className='uploadPhotoBtn'>
          <label className='uploadbtn' htmlFor="">
        <input onChange={(e:React.ChangeEvent<HTMLInputElement>) => {textWasChanged(e,"imgUrl")}} 
         type="file" id="imgUrl" name="imgUrl" />Upload an image</label>
        </div>
      <div className='allForm'>
        <div className="place">
        <div className='placeName'>
          {/* <label htmlFor="">add name</label> */}
          <input onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textWasChanged(e, "name")}}
          type="text"  id="name" name="name" placeholder='Name' />
        </div>
        <div className='descriptionInput'>
          {/* <label htmlFor="">add description</label> */}
          <input onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textWasChanged(e, "description")}}
          type="text"  id="description" name="description"  placeholder='Description' />
        </div>
        <div className='location'>
          {/* <label htmlFor="">add a location</label> */}
          <input onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textWasChanged(e, "location")}}
          type="text"  id="location" name="location" placeholder='Location'  />
        </div>
        <div className='category'>
          {/* <label htmlFor="">select category</label> */}
          <select defaultValue={"category"} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            textWasChanged(e, "category")
        }}>
             <option value="choose">Category</option>
            <option value="hiking">Hiking</option>
            <option value="camping">Camping</option>
            <option value="attraction">Attraction</option>
          select category</select>
        </div>
        {categoryIsSet==='hiking'&&
        <form id="hikingForm"  >          
      <div className='pathLength'>
          {/* <label htmlFor="">path length</label> */}
          <input 
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {texthikingWasChanged(e, "pathLength")}}
          type="text"  id="pathLength" name="pathLength" placeholder='Path length'  />
      </div>
        <div className='level'>
          {/* <label htmlFor="">select level</label> */}
          <select defaultValue={"level"} 
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {texthikingWasChanged(e, "level")}}
          >
            <option value="Level">Level</option>
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="strenuous">Streneous</option>
          select level</select>
        </div>
        <div className='totalTime'>
            {/* <label htmlFor="">Total time</label> */}
            <input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {texthikingWasChanged(e, "totalTime")}}
            type="text"  id="totalTime" name="totalTime"  placeholder='Total time' />
        </div>
        <div className='includingClimbing'>
            <label htmlFor="">Including Climbing?</label>
            <input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {texthikingWasChanged(e, "includingClimbing")}}
            type="checkbox" id="includingClimbing" name="includingClimbing"  />
        </div> 
        <div className='includingWater'>
            <label htmlFor="">Including water?</label>
            <input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {texthikingWasChanged(e, "includingWater")}}
            type="checkbox" id="includingWater" name="includingWater"  />
        </div>  
        <div className='suitableStrollers'>
            <label htmlFor="">Suitable for strollers?</label>
            <input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {texthikingWasChanged(e, "suitableStrollers")}}
            type="checkbox" id="suitableStrollers" name="suitableStrollers"  />
        </div>               
    </form>}
        {categoryIsSet==='camping'&&<form className='campingForm' id="campingForm" >          
      <div className='costPerNight'>
          {/* <label htmlFor="">cost per night</label> */}
          <input 
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textcampingWasChanged(e, "costPerNight")}}
          type="text"  id="costPerNight" name="costPerNight" placeholder='Cost per night'  />
      </div>
        <div className='meals'>
          {/* <label htmlFor="">select meals</label> */}
          <select defaultValue={"meals"} 
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {textcampingWasChanged(e, "meals")}}
          >
            <option value="selfCatering">Meals</option>
            <option value="selfCatering">Self catering</option>
            <option value="breakfastIncluded">Breakfast included</option>
            <option value="allInclusive">All inclusive</option>
            <option value="breakfastAndLunchIncluded">Breakfast and lunch included</option>
            <option value="breakfastAndDinnerIncluded">Breakfast and dinner included</option>

          </select>
        </div>
        <div className='viewTo'>
            {/* <label htmlFor="">View To</label> */}
            <input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textcampingWasChanged(e, "viewTo")}}
            type="text"  id="viewTo" name="viewTo" placeholder='View to'  />
        </div>
        <div className='peoplePerRoom'>
            {/* <label htmlFor="">People per room</label> */}
            <input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textcampingWasChanged(e, "peoplePerRoom")}}
            type="text"  id="peoplePerRoom" name="peoplePerRoom"  placeholder='People per room' />
        </div>
        <div className='includingBath'>
            <label htmlFor="">Including bath?</label>
            <input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textcampingWasChanged(e, "includingBath")}}
            type="checkbox" id="includingBath" name="includingBath"  />
        </div> 
        <div className='includingGrill'>
            <label htmlFor="">Including grill?</label>
            <input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textcampingWasChanged(e, "includingGrill")}}
            type="checkbox" id="includingGrill" name="includingGrill"  />
        </div>  
        <div className='includingKitchen'>
            <label htmlFor="">Including kitchen?</label>
            <input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textcampingWasChanged(e, "includingKitchen")}}
            type="checkbox" id="includingKitchen" name="includingKitchen"  />
        </div>                
      
    </form>}
        {categoryIsSet==='attraction'&&<form id="attractionsForm" >          
      <div className='cost'>
          {/* <label htmlFor="">Ticket price</label> */}
          <input 
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textattractionWasChanged(e, "cost")}}
          type="text"  id="cost" name="cost" placeholder='Ticket price'  />
      </div>
      <div className='minAge'>
          {/* <label htmlFor="">minimum age</label> */}
          <input 
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textattractionWasChanged(e, "minAge")}}
          type="text"  id="minAge" name="minAge" placeholder='Minimum age'  />
      </div>
      <div className='maxAge'>
          {/* <label htmlFor="">maximum age</label> */}
          <input 
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textattractionWasChanged(e, "maxAge")}}
          type="text"  id="maxAge" name="maxAge"  placeholder='Maximum age' />
      </div>
        <div className='season'>
          {/* <label htmlFor="">best season</label> */}
          <select defaultValue={"season"} 
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {textattractionWasChanged(e, "season")}}
          >
            <option value="winter">Best season</option>
            <option value="winter">winter</option>
            <option value="spring">spring</option>
            <option value="autom">autom</option>
            <option value="summer">summer</option>
            best season</select>
        </div>
        <div className='suitableForPregnant'>
            <label htmlFor="">Suitable for pregnant?</label>
            <input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textattractionWasChanged(e, "suitableForPregnant")}}
            type="checkbox" id="suitableForPregnant" name="suitableForPregnant"  />
        </div> 
        <div className='suitableForPeopleWithDisabilities'>
            <label htmlFor="">Suitable for people with disabilities?</label>
            <input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textattractionWasChanged(e, "suitableForPeopleWithDisabilities")}}
            type="checkbox" id="suitableForPeopleWithDisabilities" name="suitableForPeopleWithDisabilities"  />
        </div>  
        <div className='suitableForGroups'>
            <label htmlFor="">Suitable for groups?</label>
            <input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textattractionWasChanged(e, "suitableForGroups")}}
            type="checkbox" id="suitableForGroups" name="suitableForGroups"  />
        </div>   
    </form>}
        </div>
        <button className='shareBtn' type='submit'>share</button> 
        </div>
      </form>
    </div>
  );
}
