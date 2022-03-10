import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { getprofileUser } from './../configStore';
import axios from 'axios';
import { Post1 } from '../profile/Feed';

export  function ProfileUser() {
    const navigate = useNavigate()
    let [user,setUser]=useState("")
    let [fetching1,setFetch1] = useState(true);
    let [fetching,setFetch] = useState(true);
    let [isOpen,setisOpen] = useState(false);
    let [Posts, setPosts] = useState([
        { 
        postID:0,
        category:"",
        categoryinfo:{},
        comments:[],
        description:"",
        imgUrl: "",
        likes: [],
        location:"",
        name: ""
    }]);
    useEffect(() =>  {
        setUser(getprofileUser())
        setFetch1(false);
        if(!fetching1){
        let url = 'http://127.0.0.1:5435/posts/allThePosts/'+user;
        axios.get(url)
            .then(response => {
                let postArr=[]
                let k=0
                for (let i = 0; i < response.data.length; i++) {
                    for (let j = 0; j < response.data[i].posts.length; j++) {
                        postArr[k] = response.data[i].posts[j];
                        k++;
                    }
                }
                console.log(response.data,time);
                console.log(postArr);
                setPosts(postArr);
                setFetch(false);
                
            });}
    },[user]);
    const time =new Date().getTime();
    console.log(Posts,time);
    
    function connect(user: string) {
        setisOpen(!isOpen)
        const url="http://127.0.0.1:5435/users/follow/"+user
        const url1="http://127.0.0.1:5435/users/unfollow/"+user
        if(!isOpen){
            axios.put(url,{username:localStorage.getItem('userNameLogged')})
                .then(response => {
                    console.log(response.data);
                });
            }
        else{
            axios.put(url1,{username:localStorage.getItem('userNameLogged')})
                .then(response => {
                    console.log(response.data);
                });
        }
    }


    return fetching ?(<>loadong...</>):(
        <div>
           <button onClick={()=>{connect(user)}} >{isOpen?"disconnect":"connect"} </button> 
            {Posts.map((curr, i) => {
                
              return <Post1 key={i} userName={user} postItem={curr} />
            })} 
           
        </div>
    )
}



