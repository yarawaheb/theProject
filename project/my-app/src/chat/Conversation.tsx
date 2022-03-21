import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation(props: { conversation: { members: Array<string> }, currentUser: any }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // useEffect(() => {
  //   const friendId = props.conversation.members;

  //   const getUser = async () => {
  //     try {
  //       const res = await axios("/users?userId=" + friendId);
  //       setUser(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getUser();
  // }, [props.currentUser, props.conversation]);

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
      <span className="conversationName">{props.conversation.members}</span>
    </div>
  );
}