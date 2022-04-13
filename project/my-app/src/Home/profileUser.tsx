import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { getprofileUser, getUser } from './../configStore';
import axios from 'axios';
import { Post1 } from '../profile/Feed';
import './profileUser.css'
import { FaUserFriends } from 'react-icons/fa';

export  function ProfileUser() {
    const navigate = useNavigate()
    let [user,setUser]=useState("")
    let [userLogged,setUserLogged]= useState(localStorage.getItem('userNameLogged')!==""?localStorage.getItem('userNameLogged'):"")
    let [fetching1,setFetch1] = useState(true);
    let [fetching2,setFetch2] = useState(true);
    let [proPic,setProPic] = useState("")////////*****/

    let [fetching,setFetch] = useState(true);
    let [isOpen,setisOpen] = useState(false);
    let [userFollowings,setFollowings]=useState(["",null]);
    let [userFollowers,setFollowers]=useState([]);

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
            axios.get("http://localhost:5435/users/username",{params:user})
            .then(response =>{
                setProPic(response.data.profilePicture)
                setFollowings(response.data.followings)
                setFollowers(response.data.followers)
            })
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
                
            });

            if(userFollowings.includes(userLogged)){
                setisOpen(true);}
  
        }
    },[user]);
    // useEffect(()=>{
    //     axios.get("http://localhost:5435/users/username",{params:user})
    // .then(response =>{
    //     setProPic(response.data.profilePicture)
    //     setFollowers(response.data.followers)
    //     setFetch(false)
    // })
    // },[])

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
                    userFollowings.push(localStorage.getItem('userNameLogged'))
                    setFollowings(userFollowings)
                    console.log("gotIt");
                    
                });
            }
        else{
            axios.put(url1,{username:localStorage.getItem('userNameLogged')})
                .then(response => {
                    console.log(response.data);
                    for (let i = 0; i < userFollowings.length; i++) {
                        if(userFollowings[i]===localStorage.getItem('userNameLogged')){
                            var temp=userFollowings[userFollowings.length-1];
                            userFollowings[userFollowings.length-1]=userFollowings[i];
                            userFollowings[i]=temp;
                            userFollowings.pop();
                            console.log(userFollowings);
                            
                        }

                    }
                });
        }
    }


    return fetching ?(<><img className='loading' src="./images/loading.gif" alt="" /></>):(
        <div>
            <div className="userLOGGEDInfo1">
                <ul className="userLOGGEDInfoUL1">
                    {console.log(proPic)}

                    <li><ul className='liposts'>
                        <li><span>{Posts.length}</span></li><li><span>Posts</span></li></ul></li>
                    <li><img className="ProfileImg1" src={proPic} alt="" /></li>
                   <li><ul className="lifollowers">
                       <li><span className="followerss1">{userFollowers.length}</span></li>
                        <li><span>Followers</span></li>
                    </ul></li>
                </ul>
                <ul className='topButoom'><li className="userLOGGEDInfoSPAN1"><span >{user}</span></li>
                <li><button onClick={()=>{connect(user)}} >{isOpen?"Unfollow":"Follow"} </button></li></ul>
            </div>
            
            {Posts.map((curr, i) => {
                
              return <Post1 key={i} userName={user} postItem={curr} />
            })} 
           
        </div>
    )
}



