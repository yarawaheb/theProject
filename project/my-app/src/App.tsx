import React from 'react';
import { BrowserRouter,Routes , Route,Navigate } from 'react-router-dom';
import './App.css';
import { BiuldTrip } from './biuld_trip/BiuldTrip';
import {  Footer1 } from './footer/Footer';
import { ActionsArr, footerArr } from './footer/FooterItems';

import { Home } from './Home/home';
import { MyTrip } from './my_trip/myTrips';
import { Navbar1 } from './navBar/navBar';
import { navArr } from './navBar/navItems';
import { Personalinfo } from './profile/PersonalInfo';
import {Profile} from './profile/Profile';
import { CreateAccount } from './Signin/createAccount';
import { Signin } from './Signin/signIn';
import {getUser, newUser} from './configStore'
import { EquipmentList } from './my_trip/equipmentList';
import { useContext } from "react";
import {AddPost} from './profile/AddaPost';
import { Messenger } from './messenger/Messenger';
import { MyProfile } from './profile/MyProfile';
import { Connections } from './profile/Connection';
import NewTrip from './my_trip/newTrip';
import { ProfileUser } from './Home/profileUser';
//import { AuthContext } from "./context/AuthContext";

function App() {
  //const { user } = useContext(AuthContext);
  
  const user=localStorage.getItem('userNameLogged');
  
  
  return (
    <div className="bg">
      
        {/* <Signin/> */}
       
      <Navbar1 navItems={navArr} logoImageUrl={"./images/logo.png"}  />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Signin/>} />
          <Route path="home" element={user ? <Home /> : <Signin/>} />
          <Route path="login" element={<Signin/>} />
          <Route path="inbox" element={<Messenger/>}/>
          <Route path="createAccount" element={<CreateAccount/>} />
          <Route path="myTrips" element={<MyTrip/>}>
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
      <Footer1 actionsArr={ActionsArr} footerItems={footerArr} />
       
    </div>
  );
}

export default App;
