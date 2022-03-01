import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation(props:{ conversation:{members:[]}, currentUser:{_id:String} }) {
  const [user, setUser] = useState({userName: ""});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = props.conversation.members.find((m) => m !== props.currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [props.currentUser, props.conversation]);

  return (
    <div className="conversation">
      {/* <img
        className="conversationImg"
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "person/noAvatar.png"
        }
        alt=""
      /> */}
      <span className="conversationName">{user?.userName}</span>
    </div>
  );
}