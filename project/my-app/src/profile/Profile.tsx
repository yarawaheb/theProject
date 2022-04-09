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
    let [user ,setuser] = useState(getUser())
    useEffect(()=>{
        if(user.userName!=="")
            setFetch(false)
        console.log(user);
    },[user,fetching])
    return /*fetching ?(<><img className='loading' src="./images/loading.gif" alt="" /></>):*/(

        <div className='profilePage'>
            
            <div className='profilePagecon1'>
            <ProfileHelper profileactionsArr={ProfileActions} />
            </div>
            <div className="userProfileInformation">
                <ul className="">
                    <li><img className="userProfileImage" src={user.profilePicture} alt="" /></li>
                    <li className="userProfileUsername"><span >{user.userName}</span></li>
                </ul>
                <span className="userProfileFollowers"><FaUserFriends/> {user.followers.length}  followers </span>
            </div>
            <div className='profilePagecon2'>  
            <Outlet/>
            </div>
            
        </div>
        );
}
