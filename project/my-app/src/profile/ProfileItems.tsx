import { GiThreeFriends } from "react-icons/gi";
import { HiOutlineIdentification } from "react-icons/hi";
import { MdOutlinePostAdd } from "react-icons/md";
import { RiProfileLine } from "react-icons/ri";

export let ProfileActions = [
    {
        Icon: <HiOutlineIdentification className="homeicon"></HiOutlineIdentification>,
        title: "Personal information",
        url: "personalInformation"
    },
 
    {
        Icon: <GiThreeFriends className="inboxicon"></GiThreeFriends>,
        title: "Connections",
        url: "connections"
    },
    {
        Icon: <RiProfileLine className="inboxicon"></RiProfileLine>,
        title: "My profile",
        url: "myProfile"
    },
    {
        Icon: <MdOutlinePostAdd className="profileicon"></MdOutlinePostAdd>,
        title: "Add post",
        url: "addPost"
    }
    
];
