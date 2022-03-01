import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

export default function ChatOnline(props:{ onlineUsers:any, currentId:String, setCurrentChat: (arg0: any) => void }) {
  const [friends, setFriends] = useState([{ userName: "", _id: "" }]);
  const [onlineFriends, setOnlineFriends] = useState([{ userName: "", _id: "" }]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("http://localhost:5435/users/friends/" + props.currentId);
      setFriends(res.data);
    };

    getFriends();
  }, [props.currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => props.onlineUsers.includes(f._id)));
  }, [friends, props.onlineUsers]);

  const handleClick = async (user: { userName?: string; _id?: String; }) => {
    try {
      const res = await axios.get(
        `http://localhost:5435/conversations/find/${props.currentId}/${user._id}`
      );
      props.setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o,i) => (
        <div key={i} className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            {/* <img
              className="chatOnlineImg"
              src={
                o?.profilePicture
                  ? PF + o.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
            /> */}
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.userName}</span>
        </div>
      ))}
    </div>
  );
}