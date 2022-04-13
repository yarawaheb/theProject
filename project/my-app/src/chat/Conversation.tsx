import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation(props: { conversation: { members: Array<string> }, currentUser: any }) {
  const [user, setUser] = useState({userName:"",profilePicture:""});
  let [fetching,setFetch] = useState(true);

  useEffect(() => {
    const friendId = props.conversation.members;
    axios.get("http://localhost:5435/users/username",{params:friendId})
    .then(response =>{
        setUser(response.data)
        setFetch(false);

    })
    
  }, [user,fetching]);

  return fetching ?(<><img className='loading' src="./images/loading.gif" alt="" /></>):(
    <div className="conversation">
      <img
        className="conversationImg"
        src={user.profilePicture!==""? user.profilePicture: "./images/noProfile.jpg"}
        alt=""
      />
      <span className="conversationName">{user.userName}</span>
    </div>
  );
}