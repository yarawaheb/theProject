import "./messenger.css";
// import Topbar from "../../components/topbar/Topbar";
import Conversation from "../conversations/Conversation";
import Message from "../message/Message";
import ChatOnline from "../chatOnline/ChatOnline";
import {  useEffect, useRef, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client"; 
import { getUser } from './../configStore';

export  function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState({members:[{}],_id:""});
  const [messages, setMessages] = useState([{conversationId: "",sender:"",text: "",createdAt:new Date("2016-01-04 10:34:23")}]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState({conversationId: "",sender: "",text: "",createdAt: new Date("2016-01-04 10:34:23")});
  const [onlineUsers, setOnlineUsers] = useState([{}]);
  let socket = io("ws://localhost:8900");
  const  [user, setUser]= useState({firstName:"", lastName: "", userName: "" ,password:"",_id:"",followings:[""],profilePicture:"",followers:[""],posts:[{}],chats:[{}],trips:[{}],equipmentList:[{}]});
  getUser(setUser);
  

  useEffect(() => {
    if (user._id.length !== 0) {
      socket = io("ws://localhost:8900");
      socket.on("getMessage", (data) => {
        setArrivalMessage({
          conversationId: data.conversationId,
          sender: data.senderId,
          text: data.text,
          createdAt:new Date('2016-01-04 10:34:23'),
        });
      });
    }
  }, [user]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.emit("addUser", user._id);
    socket.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u: { userId: String; }) => u.userId === f))
      );
    });
  }, [user]); 

  useEffect(() => {
    const getConversations = async () => {
      try {
        const url ="http://localhost:5435/conversations/" +user._id
        console.log(user._id);
        
        const res = await axios.get(url);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("http://localhost:5435/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("http://localhost:5435/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      {/* <Topbar /> */}
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                      <Message message={m} own={m.sender === user._id} />
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}

