import "./message.css";
import { format } from "timeago.js";
import { useState } from 'react';

export default function Message(props:{item:{msg:{content:string,messageID:string,time:Date},sender:string}}) {
  let [content,setContent]=useState(props.item.msg.content)
  const own=props.item.sender===localStorage.getItem('userNameLogged')  
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <p className="messageText">{content}</p>
      </div>
      <div className="messageBottom">{format(props.item.msg.time)}</div>
    </div>
  );
}