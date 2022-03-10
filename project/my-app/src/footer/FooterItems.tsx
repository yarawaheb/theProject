import { RiCopyrightLine } from "react-icons/ri";
import {GrGroup} from "react-icons/gr";
import {IoIosArrowDroprightCircle} from "react-icons/io";
import {MdBuild} from "react-icons/md";
import {SiYourtraveldottv} from "react-icons/si";
import {GiSkier} from "react-icons/gi";

export let footerArr =[
    {
    string:"Take only Memories, Leave only Footprints",
    Icon: <RiCopyrightLine className="auto"></RiCopyrightLine>,
    name:"Yara Waheb 2022"

}];
export let ActionsArr = [
    {
        Icon: <SiYourtraveldottv className="homeicon"></SiYourtraveldottv>,
        title: "My trips",
        url: "/myTrips"
    },
 
    {
        Icon: <MdBuild className="inboxicon"></MdBuild>,
        title: "Join a trip",
        url: "/joinATrip"
    }
    
]
