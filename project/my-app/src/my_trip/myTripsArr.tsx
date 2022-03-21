import { MdCardTravel, MdOutlineNoteAlt, MdPlaylistAdd } from "react-icons/md";

export let MyTripsActions = [
    {
        Icon: <MdCardTravel className="homeicon"></MdCardTravel>,
        title: "My trips",
        url: "allTrips"
    },
 
    {
        Icon: <MdPlaylistAdd className="inboxicon"></MdPlaylistAdd>,
        title: "Equipment List",
        url: "equipmentList"
    },
    {
        Icon: <MdOutlineNoteAlt className="profileicon"></MdOutlineNoteAlt>,
        title: "New Trip",
        url: "newTrip"
    }
    
];
