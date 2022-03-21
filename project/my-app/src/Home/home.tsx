import {  Mooto } from "./homeHelper";
import {   motto } from "./homeArr";

import './home.css'
import axios from "axios";
import { getToken } from "../configStore";
import { Feed } from "../profile/Feed";
export function Home(){
   if(localStorage.getItem("token")!==""){
    return(
        <div  className='HomePage' >
            <Mooto mottoAtr={motto}/>
            <Feed/>
        </div>
    )}
    else{
        return(
            <h1>please login first</h1>
        )
    }
}