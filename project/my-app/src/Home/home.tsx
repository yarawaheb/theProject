import {  Mooto } from "./homeHelper";
import {   motto } from "./homeArr";

import './home.css'
import axios from "axios";
import { getToken } from "../configStore";
import { Feed } from "../profile/Feed";
import UserNotLogin from './../UserNotLogin';
import { getUser } from './../configStore';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaUserFriends } from "react-icons/fa";
export function Home(){
    let [fetching,setFetch] = useState(true);
    let[user,setUser]=useState({userName:"",profilePicture:"",followers:[""]})
    useEffect(()=>{
    const userName=localStorage.getItem('userNameLogged');
    axios.get("http://localhost:5435/users/username",{params:userName})
    .then(response =>{
        setUser(response.data)
         setFetch(false)
        console.log(user);
    })
    },[])
   if(localStorage.getItem('userNameLogged')!==''){
    return fetching ?(<><img className='loading' src="./images/loading.gif" alt="" /></>):(
        <div  className='HomePage' >
            <div className="userLOGGEDInfo">
                <ul className="userLOGGEDInfoUL">
                    <li><img className="ProfileImg" src={user.profilePicture} alt="" /></li>
                    <li className="userLOGGEDInfoSPAN"><span >{user.userName}</span></li>
                </ul>
                <span className="followerss"><FaUserFriends/> {user.followers.length}  followers </span>
            </div>
            {/* <Mooto mottoAtr={motto}/> */}
            <Feed/>
        </div>
    )}
    else{
        return(
            <UserNotLogin/>
        )
    }
}