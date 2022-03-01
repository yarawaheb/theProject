import axios from 'axios';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { setUser } from '../configStore';
import { Personalinfo } from './PersonalInfo';
import ProfileHelper from './ProfileHelper';
import { ProfileActions } from './ProfileItems';

export  function Profile() {
   
    return (
        <div className='profilePage'>
            <div className='profilePagecon1'>
            <ProfileHelper profileactionsArr={ProfileActions} />
            </div><div className='profilePagecon2'>
            <Outlet/>
            </div>
            
        </div>
        );
}
