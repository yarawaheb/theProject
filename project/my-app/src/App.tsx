import React from 'react';
import { BrowserRouter,Routes , Route,Navigate } from 'react-router-dom';
import './App.css';
import { BiuldTrip } from './biuld_trip/BiuldTrip';
import {  Footer1 } from './footer/Footer';
import {  footerArr } from './footer/FooterItems';

import { Home } from './Home/home';
import { MyTrip } from './my_trip/myTrips';
import { Navbar1, SideBar } from './navBar/navBar';
import { navArr } from './navBar/navItems';
import { Personalinfo } from './profile/PersonalInfo';
import {Profile} from './profile/Profile';
import { CreateAccount } from './Signin/createAccount';
import { Signin } from './Signin/signIn';
import {getUser, newUser} from './configStore'
import { EquipmentList } from './my_trip/equipmentList';
import { useContext } from "react";
import {AddPost} from './profile/AddaPost';
import  Messenger  from './chat/Messenger';
import { MyProfile } from './profile/MyProfile';
import { Connections } from './profile/Connection';
import NewTrip from './my_trip/newTrip';
import { ProfileUser } from './Home/profileUser';
import AllTrips from './my_trip/allTrips';
import JoinTrip from './joinTrip/joinTrip';
//import { AuthContext } from "./context/AuthContext";

function App() {
  return (
    <div className="bg">
      
        {/* <Signin/> */}
       
      <Navbar1 navItems={navArr} logoImageUrl={"./images/logo.png"}  />
      <SideBar navItems={navArr}  />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={ <Home /> } />
          <Route path="login" element={<Signin/>} />
          <Route path="inbox" element={<Messenger/>}/>
          <Route path="createAccount" element={<CreateAccount/>} />
          <Route path="joinATrip" element={<JoinTrip/>} />
          <Route path="myTrips" element={<MyTrip/>}>
            <Route path="allTrips" element={<AllTrips/>}/>
            <Route path="equipmentList" element={<EquipmentList/>}/>
            <Route path="newTrip" element={<NewTrip postItem={{name: "",location: "",imgUrl: "",description: "",category: ""}} userName={''}  />}/>
          </Route>
          <Route path="profileUser" element={<ProfileUser/>}/>
          <Route path="profile" element={<Profile/>}>
             <Route path="personalInformation" element={<Personalinfo newUser={newUser}/>}/>
             <Route path="addPost" element={<AddPost/>}/>
             <Route path="connections" element={<Connections/>}/>
             <Route path="myProfile" element={<MyProfile/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer1  footerItems={footerArr} />
       
    </div>
  );
}

export default App;
