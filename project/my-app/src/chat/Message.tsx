import "./message.css";
import { format } from "timeago.js";
import { useEffect, useState } from 'react';
import axios from "axios";

export default function Message(props:{item:{msg:{content:string,messageID:string,time:Date},sender:string},proIMG:string}) {
  let [content,setContent]=useState(props.item.msg.content)
  //const [user, setUser] = useState({userName:"",profilePicture:""});
  const own=props.item.sender===localStorage.getItem('userNameLogged')  
  // useEffect(() => {
  //   const friendId = props.item.sender;
  //   axios.get("http://localhost:5435/users/username",{params:friendId})
  //   .then(response =>{
  //       setUser(response.data)
  //   })
    
  // }, []);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={props.proIMG}
          alt=""
        />
        <p className="messageText">{content}</p>
      </div>
      <div className="messageBottom">{format(props.item.msg.time)}</div>
    </div>
  );
}