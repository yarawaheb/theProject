import {ImHome3} from "react-icons/im";
import {CgProfile} from "react-icons/cg";
import {BiMessageAlt} from "react-icons/bi";
import {FaSearch} from "react-icons/fa";
import {MdLogout, MdNotifications} from "react-icons/md";

import { icons } from 'react-icons/lib';
export let navArr = [
    {
        Icon: <ImHome3 className="homeicon"></ImHome3>,
        title: "Home",
        url: "/home"
    },
    {
        Icon: <MdNotifications className="notiicon"></MdNotifications>,
        title: "Notifications",
        url: "/notifications"
    },
    {
        Icon: <BiMessageAlt className="inboxicon"></BiMessageAlt>,
        title: "Inbox",
        url: "/inbox"
    },
    {
        Icon: <CgProfile className="profileicon"></CgProfile>,
        title: "Profile",
        url: "/profile"
    },
    {
        Icon: <MdLogout className="loginicon"></MdLogout>,
        title: "login",
        url: "/login"
    }
    
];