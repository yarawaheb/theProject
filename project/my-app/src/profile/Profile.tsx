import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { getUser, setUser } from '../configStore';
import { Personalinfo } from './PersonalInfo';
import ProfileHelper from './ProfileHelper';
import { ProfileActions } from './ProfileItems';
import { Feed } from './Feed';
import { FaUserFriends } from 'react-icons/fa';

export  function Profile() {
    let [fetching,setFetch] = useState(true);
    let [user ,setuser] = useState({profilePicture:"",userName:"",followers:[""]})
    useEffect(()=>{
        const userName=localStorage.getItem('userNameLogged');

    axios.get("http://localhost:5435/users/username",{params:userName})
    .then(response =>{
        setuser(response.data)
         setFetch(false)
        console.log(user);
    })
    },[])

    return fetching ?(<><img className='loading' src="./images/loading.gif" alt="" /></>):(

        <div className='profilePage'>
            
            <div className='profilePagecon1'>
            <ProfileHelper profileactionsArr={ProfileActions} />
            </div>
            
           <div> <ProfileSide user={user}/></div>
            <div className='profilePagecon2'>  
            <Outlet/>
            </div>
            
        </div>
        );
}

function ProfileSide(props:{user:{profilePicture:string,userName:string,followers:string[]}}){
    
    return (
        <div className="userProfileInformation">
                <ul className="">
                    <li><img className="userProfileImage" src={props.user.profilePicture} alt="" /></li>
                    <li className="userProfileUsername"><span >{props.user.userName}</span></li>
                </ul>
                <span className="userProfileFollowers"><FaUserFriends/> {props.user.followers.length}  followers </span>
            </div>
    )
}