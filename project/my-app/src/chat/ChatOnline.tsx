import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";
import { getUser } from './../configStore';

export default function ChatOnline(props:{onlineUsers:Array<string>}) {
  const [friends, setFriends] = useState([""]);
  const [onlineFriends, setOnlineFriends] = useState([""]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    console.log(props.onlineUsers);
    
    const getFriends = getUser().followers
    for (let i = 0; i < getUser().followings.length; i++) {
      if (!getFriends.includes(getUser().followings[i])){
        getFriends.push(getUser().followings[i])
      }
    }
      setFriends(getFriends);
  }, []);

  useEffect(() => {
    const arr=[]
    let j=0
    for (let i = 0; i < friends.length; i++) {
      if(props.onlineUsers.includes(friends[i])){
        arr[j]=friends[i]
        j++
      }

    }
    setOnlineFriends(arr);
  }, [friends, props.onlineUsers]);


  return (
    <div className="chatOnline">
      {onlineFriends.map((o,i) => (
        <div key={i} className="chatOnlineFriend" >
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o}</span>
        </div>
      ))}
    </div>
  );
}