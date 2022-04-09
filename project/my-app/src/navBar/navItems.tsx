import {ImHome3} from "react-icons/im";
import {CgProfile} from "react-icons/cg";
import {BiMessageAlt, BiTrip} from "react-icons/bi";
import {FaSearch} from "react-icons/fa";
import {MdBuild, MdLogout, MdNotifications} from "react-icons/md";

import { icons } from 'react-icons/lib';
import { AiOutlineAppstoreAdd, AiOutlineHome } from "react-icons/ai";
import { SiYourtraveldottv } from "react-icons/si";
export let navArr = [
    {
        Icon: <AiOutlineHome className="homeicon"></AiOutlineHome>,
        title: "Home",
        url: "/home"
    },

    {
        Icon: <BiMessageAlt className="inboxicon"></BiMessageAlt>,
        title: "Chat",
        url: "/inbox"
    },
    {
        Icon: <CgProfile className="profileicon"></CgProfile>,
        title: "Profile",
        url: "/profile"
    },
    {
        Icon: <BiTrip className="homeicon"></BiTrip>,
        title: "My trips",
        url: "/myTrips"
    },
 
    {
        Icon: <AiOutlineAppstoreAdd className="inboxicon"></AiOutlineAppstoreAdd>,
        title: "Join a trip",
        url: "/joinATrip"
    },
    {
        Icon: <MdLogout className="loginicon"></MdLogout>,
        title: "Logout",
        url: "/login"
    },
    
];