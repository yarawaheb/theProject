import axios from 'axios';
import "./feed.css";
import { createContext, useEffect, useState } from 'react';
import { MdLocationOn, MdOutlineDelete, MdOutlineExpandMore } from 'react-icons/md';
import { Navigate, useNavigate } from 'react-router-dom';
import NewTrip from './../my_trip/newTrip';
import { ProfileUser } from './../Home/profileUser';
import { getUser, setprofileUser } from '../configStore';
import { response } from 'express';
import { AiOutlineComment } from 'react-icons/ai';
import { TiDelete } from 'react-icons/ti';
import { BsCheck, BsReply, BsSuitHeart, BsSuitHeartFill, BsX } from 'react-icons/bs';
import { RiDeleteBin6Line, RiMore2Fill } from 'react-icons/ri';
import { BiEditAlt } from 'react-icons/bi';
import {BiSend} from 'react-icons/bi'
import { GrLocationPin } from 'react-icons/gr';


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
                for (let i = postArr.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    let temp={}
                    let temp2=""
                    temp=postArr[i];
                    temp2=usernameArr[i];
                    // let temp = postArr[i];
                    postArr[i] = postArr[j];
                    usernameArr[i]=usernameArr[j]
                    postArr[j] = temp;
                    usernameArr[j]=temp2;
                  }

                setPosts(postArr);
                setUsername(usernameArr)
                setFetch(false);
            });
    },[]);
    const time =new Date().getTime();
    
    return fetching ?(<><img className='loading' src="./images/loading.gif" alt="" /></>):(
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
    let [fetching,setFetch] = useState(true);
    let [isEditing,setIsEditing]=useState(false)
    let [AttractionInfo, setAttractionInfo] = useState({postID:"",cost:0,minAge:0,maxAge:0,season:"",suitableForPregnant:false,suitableForPeopleWithDisabilities:false,suitableForGroups:false,})
    let [campingInfo, setcampingInfo] = useState({postID:"",costPerNight:0,meals:"",viewTo:"",peoplePerRoom:0,includingBath:false,includingGrill:false,includingKitchen:false})
    let [hikingInfo, sethikingInfo] = useState({postID:"",pathLength:0,level:"",totalTime:0,includingClimbing:false,includingWater:false,suitableStrollers:false})
    let [isOpen, setIsOpen] = useState(false)
    let [isOpenInfo, setIsOpenInfo] = useState(false)
    let [isOpenNewTrip, setisOpenNewTrip] = useState(false)
    let [isuserclick, setuserclick] = useState(false)
    let [more, setMore] = useState(false)
    let [isOpenComments,setIsOpenComments]=useState(false)
    const [desc, setDesc] = useState('');
    let [TripsAreHere,setTripsAreHere]=useState(false)
    let [IsLike,setIsLike]=useState(props.postItem.likes.includes(localStorage.getItem('userNameLogged'))?true:false)
    let [comments, setcomments] = useState(props.postItem.comments);
    let [likes, setLikes] = useState(props.postItem.likes);
    let [likesLength,setLikesLength]=useState(props.postItem.likes.length)
    let [proPic,setProPic] = useState("")////////*****/
    let [Trips,setTrips]=useState([{tripId:0,Name: "",planner:"",days:0,posts:[{}],members:[],equipmentList:[{}]}])
    let url2 = 'http://127.0.0.1:5435/posts/AddComment/' + props.userName + '/' + props.postItem.postID
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
        setIsLike(props.postItem.likes.includes(localStorage.getItem('userNameLogged'))?true:false)
        
    },[likes]);
     let [postInfo, setPostInfo] = useState(props.postItem)
    useEffect(()=>{
        axios.get("http://localhost:5435/users/username",{params:props.userName})
    .then(response =>{
        setProPic(response.data.profilePicture)
        setFetch(false)
    })
    },[])

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
    const SendComment = () => {
        const comment = {
            userName: getUser().userName,
            content: desc,
            commentId: JSON.stringify(props.postItem.comments.length + 1),
            secCommentId: "-1"
        }

        axios.put(url2, {
            comment
        })
            .then(response => {
                console.log(response.data);
                comments.push(comment);
                setcomments(comments);
                setDesc("")
            });
    }
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
      async function  searchForTrips(userName: string) {
        setIsOpen(!isOpen)
        let url = 'http://127.0.0.1:5435/trips/allTrips/'+getUser().userName;
        axios.get(url)
            .then(response => {
                console.log(response.data);
                
                setTrips(response.data);
            });
        setTripsAreHere(true)
    }
    function handleLike() {
        console.log(IsLike);
        setIsLike(!IsLike)
        console.log(IsLike);
        
        if(!likes.includes(localStorage.getItem('userNameLogged'))){
            let url2 = 'http://127.0.0.1:5435/posts/AddLike/' + props.userName + '/' + props.postItem.postID
            axios.put(url2, {user:localStorage.getItem('userNameLogged')})
                .then(response => {
                    console.log(response.data);
                    likes.push(localStorage.getItem('userNameLogged'));
                    setLikes(likes);
                    setLikesLength(likesLength++);
                    setLikesLength(likesLength++);
                    console.log(likes);
                });
        }
        else{
            let url2 = 'http://127.0.0.1:5435/posts/RemoveLike/' + props.userName + '/' + props.postItem.postID +"/"+localStorage.getItem('userNameLogged')
            axios.delete(url2)
                .then(response => {
                    console.log(response.data);
                    for (let i = 0; i < likes.length; i++) {
                        if(likes[i]===localStorage.getItem('userNameLogged')){
                            var temp=likes[likes.length-1];
                            likes[likes.length-1]=likes[i];
                            likes[i]=temp;
                            likes.pop();
                            console.log(likes);
                            
                        }

                    }
                    setLikes(likes);
                    setLikesLength(likesLength--);
                    setLikesLength(likesLength--);
                    console.log(likes);
                });
        }
    }
    return fetching ?(<><img className='loading' src="./images/loading.gif" alt="" /></>):(
        <div className="post">
        <ul>
        
            {setprofileUser(props.userName)}
            {isuserclick&&navigate('/profileUser')}
            <div className="postTop">
            <div className="postTopLeft">
                <img className="postProfileImg" src={proPic!==""? proPic: "./images/noProfile.jpg"}alt=""/>
                <li className="postUsername"><span  onClick={()=>{setuserclick(!isuserclick)}}>{props.userName}  </span>   </li></div>
                <div className='moreactions'>
                {more&&props.userName===getUser().userName&&<ul className='moreItem'><li  onClick={()=>{deletePost(props)}}><RiDeleteBin6Line></RiDeleteBin6Line>  delete</li><li  onClick={()=>{setIsEditing(!isEditing)}}><BiEditAlt></BiEditAlt>  edit</li></ul>}</div>
                <li>{ <RiMore2Fill className='more' onClick={()=>{setMore(!more)}}></RiMore2Fill>}</li>
                </div>
                <li className='categoryTag'>{props.postItem.category} 
                </li>
                <div className="postCenter">
                    <li> <img className="postImg" src={props.postItem.imgUrl} alt=""  /> </li>
                </div>
            <ul className='likeandcomment'>
           <li> {IsLike?<BsSuitHeartFill onClick={()=>{handleLike()}} color='RED'></BsSuitHeartFill>:<BsSuitHeart onClick={()=>{handleLike()}}></BsSuitHeart>} {likesLength}</li>
            <li><AiOutlineComment onClick={()=>{setIsOpenComments(!isOpenComments)}}></AiOutlineComment>{comments.length}
            {isOpenComments&&<ul>
                {comments.map((curr, i) => (
                    curr.secCommentId === "-1" ?
                        <li className='feedComment'><Comment key={i} Comment={props.postItem.comments} userName={props.userName} postId={props.postItem.postID} commentItems={curr} /></li>
                        : null
                ))
                }
                

                </ul>} </li></ul>

            <li >{!isEditing?"":"Name :"}{!isEditing ? "" : <input onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textWasChanged(e, "name")}}
            type="text"  id="name" name="name" defaultValue={props.postItem.name} /> } </li>
            <li>{!isEditing?<MdLocationOn color='green'/>:"Location :"} {!isEditing ? <a href={props.postItem.location}>{props.postItem.name}</a> :<input onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textWasChanged(e, "location")}}
            type="text"  id="location" name="location"  defaultValue={props.postItem.location} /> } </li>
            <li>Description : {!isEditing? props.postItem.description :<input onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textWasChanged(e, "description")}}
            type="text"  id="description" name="description" defaultValue={props.postItem.description} />} </li>
            
            <MdOutlineExpandMore onClick={()=>{setIsOpenInfo(!isOpenInfo)}}/>
            {isOpenInfo&&
            <div >
                <div className='camping_info'>
                    
                <ul className='categoryInfo'>
                    <li> {props.postItem.category==="camping"&& <span>Cost per night   :  </span>  } </li>
                    <li> {props.postItem.category==="camping"&& !isEditing? campingInfo.costPerNight :props.postItem.category==="camping"&& <input 
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textcampingWasChanged(e, "costPerNight")}}
          type="text"  id="costPerNight" name="costPerNight"  defaultValue={props.postItem.categoryinfo.costPerNight} />} </li>
                   </ul>
                <ul className='categoryInfo'>
                    <li> {props.postItem.category==="camping"&& <span>meals   :  </span>  } </li>
                    <li> {props.postItem.category==="camping"&&!isEditing? campingInfo.meals==='selfCatering'?'Self catering':
                    campingInfo.meals==='breakfastIncluded'?'Breakfast included':
                    campingInfo.meals==='allInclusive'?'All inclusive':
                    campingInfo.meals==='breakfastAndLunchIncluded'?'Breakfast and lunch included':'Breakfast and dinner included'
                    :props.postItem.category==="camping"&&<select defaultValue={props.postItem.categoryinfo.meals} 
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {textcampingWasChanged(e, "meals")}}
          >
            <option value="selfCatering">Self catering</option>
            <option value="breakfastIncluded">Breakfast included</option>
            <option value="allInclusive">All inclusive</option>
            <option value="breakfastAndLunchIncluded">Breakfast and lunch included</option>
            <option value="breakfastAndDinnerIncluded">Breakfast and dinner included</option>

          select level</select>} </li></ul>
                <ul className='categoryInfo'>
                    <li> {props.postItem.category==="camping"&& <span>View to    :  </span>  } </li>
                    <li> {props.postItem.category==="camping"&&!isEditing? campingInfo.viewTo:props.postItem.category==="camping"&&<input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textcampingWasChanged(e, "viewTo")}}
            type="text"  id="viewTo" name="viewTo"  defaultValue={props.postItem.categoryinfo.viewTo} />} </li>
                   </ul>
                <ul className='categoryInfo'>
                    <li> {props.postItem.category==="camping"&& <span>People per room    :  </span>  } </li>
                    <li> {props.postItem.category==="camping"&&!isEditing? campingInfo.peoplePerRoom:props.postItem.category==="camping"&&<input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textcampingWasChanged(e, "peoplePerRoom")}}
            type="text"  id="peoplePerRoom" name="peoplePerRoom"  defaultValue={props.postItem.categoryinfo.peoplePerRoom} />} </li>
                   </ul>
                <ul className='categoryInfo'>
                    <li> {props.postItem.category==="camping"&& <span>Bath      </span>  } </li>
                    <li> {props.postItem.category==="camping"&&!isEditing? campingInfo.includingBath? <BsCheck color='green'/>:<BsX color='red'/>:props.postItem.category==="camping"&&<input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textcampingWasChanged(e, "includingBath")}}
            type="checkbox" id="includingBath" name="includingBath" defaultValue={props.postItem.categoryinfo.includingBath} />} </li>
                   </ul>
                <ul className='categoryInfo'>
                    <li> {props.postItem.category==="camping"&& <span>Grill    </span>  } </li>
                    <li> {props.postItem.category==="camping"&&!isEditing? campingInfo.includingGrill? <BsCheck color='green'/>:<BsX color='red'/>:props.postItem.category==="camping"&&<input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textcampingWasChanged(e, "includingGrill")}}
            type="checkbox" id="includingGrill" name="includingGrill" defaultValue={props.postItem.categoryinfo.includingGrill} />} </li>
                    </ul>
                <ul className='categoryInfo'>
                    <li> {props.postItem.category==="camping"&& <span>Kitchen     </span>  } </li>
                    <li> {props.postItem.category==="camping"&&!isEditing? campingInfo.includingKitchen? <BsCheck color='green'/>:<BsX color='red'/>:props.postItem.category==="camping"&&<input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textcampingWasChanged(e, "includingKitchen")}}
            type="checkbox" id="includingKitchen" name="includingKitchen" defaultValue={props.postItem.categoryinfo.includingKitchen} />} </li>
                </ul></div>
                <div className='hiking_info'>
                <ul className='categoryInfo'>
                    <li> {props.postItem.category==="hiking"&& <span>Path length    :  </span>  } </li>
                    <li>{props.postItem.category==="hiking"&&!isEditing? hikingInfo.pathLength:props.postItem.category==="hiking"&&<input 
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {texthikingWasChanged(e, "pathLength")}}
          type="text"  id="pathLength" name="pathLength"  defaultValue={props.postItem.categoryinfo.pathLength} />} </li>
                   </ul>
                <ul className='categoryInfo'>
                    <li> {props.postItem.category==="hiking"&& <span>Level    :  </span>  } </li>
                    <li> {props.postItem.category==="hiking"&&!isEditing? hikingInfo.level==='easy'||hikingInfo.level===''?'Easy':
                    hikingInfo.level==='moderate'?'Moderate':'Streneous'
                    :props.postItem.category==="hiking"&&<select defaultValue={props.postItem.categoryinfo.level} 
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {texthikingWasChanged(e, "level")}}
          >
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="strenuous">Streneous</option>
          select level</select>} </li>
          </ul>
                <ul className='categoryInfo'>
                    <li> {props.postItem.category==="hiking"&& <span>Total time    :  </span>  } </li>
                    <li> {props.postItem.category==="hiking"&&!isEditing? hikingInfo.totalTime:props.postItem.category==="hiking"&&<input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {texthikingWasChanged(e, "totalTime")}}
            type="text"  id="totalTime" name="totalTime"  defaultValue={props.postItem.categoryinfo.totalTime} />} </li>
                   </ul>
                <ul className='categoryInfo'>
                    <li> {props.postItem.category==="hiking"&& <span>Climbing     </span>  } </li>
                    <li> {props.postItem.category==="hiking"&& !isEditing? hikingInfo.includingClimbing? <BsCheck color='green'/>:<BsX color='red'/>:props.postItem.category==="hiking"&&<input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {texthikingWasChanged(e, "includingClimbing")}}
            type="checkbox" id="includingClimbing" name="includingClimbing" defaultValue={props.postItem.categoryinfo.includingClimbing} />} </li>
           </ul>
                <ul className='categoryInfo'>
            <li> {props.postItem.category==="hiking"&& <span>Water      </span>  } </li>
                    <li> {props.postItem.category==="hiking"&& !isEditing? hikingInfo.includingWater? <BsCheck color='green'/>:<BsX color='red'/>:props.postItem.category==="hiking"&&<input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {texthikingWasChanged(e, "includingWater")}}
            type="checkbox" id="includingWater" name="includingWater" defaultValue={props.postItem.categoryinfo.includingWater} />} </li>
                  </ul>
                <ul className='categoryInfo'>
                    <li> {props.postItem.category==="hiking"&& <span>Suitable for strollers      </span>  } </li>
                    <li> {props.postItem.category==="hiking"&&!isEditing? hikingInfo.suitableStrollers? <BsCheck color='green'/>:<BsX color='red'/>:props.postItem.category==="hiking"&&<input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {texthikingWasChanged(e, "suitableStrollers")}}
            type="checkbox" id="suitableStrollers" name="suitableStrollers" defaultValue={props.postItem.categoryinfo.suitableStrollers} />} </li>
                </ul></div>
                <div className='attraction_info'>
                <ul className='categoryInfo'>
                    <li> {props.postItem.category==="attraction"&& <span>Cost    :  </span>  } </li>
                    <li>  {props.postItem.category==="attraction"&&!isEditing? AttractionInfo.cost:props.postItem.category==="attraction"&& <input 
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textattractionWasChanged(e, "cost")}}
          type="text"  id="cost" name="cost"  defaultValue={props.postItem.categoryinfo.cost} />} </li>
                   </ul>
                <ul className='categoryInfo'>
                    <li> {props.postItem.category==="attraction"&& <span>Minimum age    :  </span>  } </li>
                    <li> {props.postItem.category==="attraction"&&!isEditing? AttractionInfo.minAge:props.postItem.category==="attraction"&&<input 
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textattractionWasChanged(e, "minAge")}}
          type="text"  id="minAge" name="minAge"  defaultValue={props.postItem.categoryinfo.minAge} />} </li>
                   </ul>
                <ul className='categoryInfo'>
                    <li> {props.postItem.category==="attraction"&& <span>Maximum age    :  </span>  } </li>
                    <li> {props.postItem.category==="attraction"&&!isEditing? AttractionInfo.maxAge:props.postItem.category==="attraction"&&<input 
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textattractionWasChanged(e, "maxAge")}}
          type="text"  id="maxAge" name="maxAge"  defaultValue={props.postItem.categoryinfo.maxAge} />} </li>
                   </ul>
                <ul className='categoryInfo'>
                    <li> {props.postItem.category==="attraction"&& <span>Best season    :  </span>  } </li>
                    <li> {props.postItem.category==="attraction"&&!isEditing? AttractionInfo.season==='winter'||AttractionInfo.season===''?'Winter':
                    AttractionInfo.season==='spring'?'Spring':
                    AttractionInfo.season==='autom'?'Autom':'Summer'
                    :props.postItem.category==="attraction"&&<select defaultValue={props.postItem.categoryinfo.season} 
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {textattractionWasChanged(e, "season")}}
          >
            <option value="winter">winter</option>
            <option value="spring">spring</option>
            <option value="autom">autom</option>
            <option value="summer">summer</option>
            best season</select>} </li>
            </ul>
                <ul className='categoryInfo'>
                    <li> {props.postItem.category==="attraction"&& <span>Suitable for pregnant      </span>  } </li>
                    <li> {props.postItem.category==="attraction"&&!isEditing? AttractionInfo.suitableForPregnant? <BsCheck color='green'/>:<BsX color='red'/>:props.postItem.category==="attraction"&&<input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textattractionWasChanged(e, "suitableForPregnant")}}
            type="checkbox" id="suitableForPregnant" name="suitableForPregnant" defaultValue={props.postItem.categoryinfo.suitableForPregnant} />} </li>
                    </ul>
                <ul className='categoryInfo'>
                    <li> {props.postItem.category==="attraction"&& <span>Suitable for people with disabilities      </span>  } </li>
                    <li> {props.postItem.category==="attraction"&&!isEditing? AttractionInfo.suitableForPeopleWithDisabilities? <BsCheck color='green'/>:<BsX color='red'/>:props.postItem.category==="attraction"&&<input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textattractionWasChanged(e, "suitableForPeopleWithDisabilities")}}
            type="checkbox" id="suitableForPeopleWithDisabilities" name="suitableForPeopleWithDisabilities" defaultValue={props.postItem.categoryinfo.suitableForPeopleWithDisabilities} />} </li>
                    </ul>
                <ul className='categoryInfo'>
                    <li> {props.postItem.category==="attraction"&& <span>Suitable for groups      </span>  } </li>
                    <li> {props.postItem.category==="attraction"&&!isEditing? AttractionInfo.suitableForGroups? <BsCheck color='green'/>:<BsX color='red'/>:props.postItem.category==="attraction"&&<input 
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textattractionWasChanged(e, "suitableForGroups")}}
            type="checkbox" id="suitableForGroups" name="suitableForGroups" defaultValue={props.postItem.categoryinfo.suitableForGroups} />} </li>
               </ul> </div>
            </div>
            
            }
        </ul>
        <div className='addToTrip'>
        {isEditing&&<button onClick={()=>{savePost()}}>save</button>}
        {isOpenNewTrip && <NewTrip userName={props.userName} postItem={props.postItem} ></NewTrip>}
        <div >
            {isOpen &&Trips!==[]&&<div className='addmyTrips'>
            <button className='newTripBtnStyle' onClick={()=>{setisOpenNewTrip(!isOpenNewTrip)}} >{!isOpenNewTrip?'Create new trip':'Exit'}</button>
           {Trips.map((curr, i) => {
           return <TripName  key={i} trip={curr} postItem={props.postItem}  />
           })} 
            </div>}
        </div></div>
        <div className='postButtom'>
            <input className='commentInput' type="text" placeholder="Add comment" value={desc} onChange={event => setDesc(event.target.value)} />
            <BiSend className='sendIcon' onClick={() => { SendComment() }}> </BiSend>
            <button className='addToMyTrip' onClick={()=>{searchForTrips(props.userName)}} >add to my trip</button>
        </div>
    </div>)
}

function TripName(props:{trip:{tripId:number,Name: string,planner:string,days:number,posts:Array<any>,members:Array<string>,equipmentList:Array<any>},postItem:{name:String,location:String,imgUrl:String,description:String,category:String}}){
    function addPostToTrip() {
        const url="http://127.0.0.1:5435/trips/addTo/"+localStorage.getItem('userNameLogged')+'/'+props.trip.tripId
        axios.put(url,props.postItem)
            .then(response => {
                console.log(response.data);
                alert('the post added to your trip')
            });    }
    return(
        <div className='allTrips'>
            <button  onClick={()=>{addPostToTrip()}}>{props.trip.Name}</button>
        </div>
    )
}
function Comment(props: { userName: string, postId: number, Comment: Array<any>, commentItems: { userName: string, content: string, commentId: string, secCommentId: string } }) {
    const url = 'http://127.0.0.1:5435/posts/DeleteComment/' + props.userName + '/' + props.postId + '/' + props.commentItems.commentId;
    const [isOpen, setisOpen] = useState(false);
    let [comments, setcomments] = useState(props.Comment);
    const [desc, setDesc] = useState('');
    let url2 = 'http://127.0.0.1:5435/posts/AddComment/' + props.userName + '/' + props.postId



    const handleDelete = () => {

        axios.delete(url)

            .then(response => {
                console.log(response.data);

            });
    }

    const SendComment = () => {
        const comment = {
            nickname: getUser().userName,
            content: desc,
            commentId: JSON.stringify(props.Comment.length + 1),
            secCommentId: props.commentItems.commentId
        }

        axios.put(url2, {
            comment
        })
            .then(response => {
                console.log(response.data);
                comments.push(comment);
                setcomments(comments);
                setDesc("")
            });
    }


    return (
        <div>
            <span >{props.commentItems.userName}  </span>  
            <input defaultValue={props.commentItems.content} />
            <BsReply onClick={() => { setisOpen(isOpen ? false : true) }}></BsReply>  
            {localStorage.getItem('userNameLogged')===props.userName||localStorage.getItem('userNameLogged')===props.commentItems.userName?<MdOutlineDelete className='deleteCommentIcon' onClick={() => { handleDelete() }} />:""}
            {isOpen &&
                <div>
                    {comments.map((curr, i) => (
                        curr.secCommentId === props.commentItems.commentId ?
                            <div key={i} className='secComments'>
                                <span> {curr.nickname}     </span>  
                                <input defaultValue={curr.content} />
                                {localStorage.getItem('userNameLogged')===props.userName||localStorage.getItem('userNameLogged')===curr.nickname?<MdOutlineDelete className='deleteCommentIcon' onClick={() => { handleDelete() }} />:""}
                            </div>
                            : null
                    ))
                    }
                    <div className='sendSecComment'>
                    <input className='secCommentInput' type="text" placeholder="Add comment" value={desc} onChange={event => setDesc(event.target.value)} />
                    <BiSend className='sendIcon' onClick={() => { SendComment() }}> </BiSend></div>
                </div>

            }
            


        </div >
    )
}



/////didnt try it , i need to delete all posts and add them again because i dont have postID yet
function deletePost(props: { userName: string; postItem: { postID: Number; category: string; categoryinfo: any; comments: Array<any>; description: string; imgUrl: string; likes: Array<any>; location: string; name: string; }; }) {
    const url1="http://localhost:5435/posts/deletePost/"+props.postItem.postID+"/"+props.userName;
    axios.delete(url1)
        .then(response2 => {
            console.log(response2.data);})
}





