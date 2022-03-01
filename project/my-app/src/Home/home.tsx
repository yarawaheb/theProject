import { Attractions,  Camping, Hiking,  Mooto } from "./homeHelper";
import { bestOfAttraction, bestOfCamping, bestOfHiking,  motto } from "./homeArr";

import './home.css'
import axios from "axios";
import { getToken } from "../configStore";
import { Feed } from "../profile/Feed";
export function Home(){
   if(localStorage.getItem("token")!==""){
    return(
        <div  className='HomePage' >
            <Mooto mottoAtr={motto}/>
            {/* <div className='bestOf'>
                <label htmlFor="">Best of Hiking </label>
                <Hiking Images={bestOfHiking}/>
                <label htmlFor="">Best of Camping</label>
                <Camping Images={bestOfCamping}/>
                <label htmlFor="">Best of Attractions</label>
                <Attractions Images={bestOfAttraction}/>
            </div> */}
            <Feed/>
        </div>
    )}
    else{
        return(
            <h1>please login first</h1>
        )
    }
}