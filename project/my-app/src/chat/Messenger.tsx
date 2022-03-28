import "./messenger.css";
import Conversation from "./Conversation";
import Message from "./Message";
import ChatOnline from "./ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { getUser } from "../configStore";
import { format } from 'timeago.js';
import { time } from "console";
import { RiChatNewFill } from "react-icons/ri";

export default function Messenger() {
  const [conversations, setConversations] = useState([{chatID:"",members:[""],messages:[{content:"",messageID:"",time:new Date()}]}]);
  const [messages, setmessages] = useState([{msg:{content:"",messageID:"",time:new Date()},sender:""}]);
  const [currentChat, setCurrentChat] = useState({chatID:"",members:[""],messages:[{}]});
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState({msg:{content:"",messageID:"",time:new Date()},sender:""});
  const [onlineUsers, setOnlineUsers] = useState([""]); 
  const socket = useRef(io());
  const scrollRef = useRef<HTMLDivElement>(null);
  const user = getUser().userName
  const [gotmessages,setGotMessages]=useState(false)
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([""]);
  const [people, setPeople] = useState([""]);
  const [openRes,setOpenRes]=useState(false)

  function handleClick(item: string){
    let len=0
    axios.get("http://127.0.0.1:5435/chat/conversations/" + item)
        .then(res=>{
          len=res.data.length;
       
    const newConv1={chatID:JSON.stringify(len+1),members:[localStorage.getItem('userNameLogged')],messages:[]}
    const newConv={chatID:JSON.stringify(conversations.length+1),members:[item],messages:[]}
  
    axios.put("http://127.0.0.1:5435/chat/addConv/" + localStorage.getItem('userNameLogged')+'/'+item,{newConv,newConv1})
        .then(res=>{
          console.log(res.data);
        })
    console.log("1");
    conversations.push(newConv)
    setConversations(conversations)
    ShowChat(newConv)
    setCurrentChat(newConv)

    setOpenRes(false)
  })
  }

  function setChat(c: { chatID: string; members: string[]; messages: {content:string,messageID:string,time:Date}[] }): void {
    setCurrentChat(c)
    for (let i = 0; i < conversations.length; i++) {
      if(conversations[i].members[0]===c.members[0]){
          ShowChat(conversations[i])
        }
    }
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value===""){
      setOpenRes(false)
    }
    else
      setOpenRes(true)
    setSearchTerm(e.target.value);
  };
  useEffect(()=>{
    axios.get("http://localhost:5435/users/all")
    .then(res=>{
      const result=[]
      for (let i = 0; i < res.data.length; i++) {
        result[i] = res.data[i].userName;
      }
      
      setPeople(result)
    })
  },[])

  useEffect(() => {
    const results = people.filter(person =>
      person.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      console.log(data);
      
      setArrivalMessage({msg:{
      messageID:JSON.stringify(messages.length+1),
      content: data.content,
      time: new Date(Date.now())
      },sender:data.sender});
    });
  }, [socket]);

  useEffect(() => {
    arrivalMessage.sender!=="" &&
      currentChat?.members.includes(getUser().userName) &&
      messages.push(arrivalMessage);
      setmessages((prev) => [...prev, arrivalMessage]);
      setNewMessage("");
      
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", getUser()._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
      console.log(getUser().followings);
      
      const arr=[]
      let j=0
      for (let i = 0; i < users.length; i++) {
        if(getUser().followings.includes(users[i].userId)){
          arr[j]=users[i].userId
          j++
        }
      }
      setOnlineUsers(arr)
    });
  }, [user]);

  useEffect(() => {  
        axios.get("http://127.0.0.1:5435/chat/conversations/" + localStorage.getItem('userNameLogged'))
        .then(res=>{
          setConversations(res.data);
        })
  }, []);


  function ShowChat(conv: any) {
    const messagescurr=conv.messages
    console.log(messagescurr);
    setGotMessages(false)///
    let messagesOther=[];
    let allmsg=[{msg:{content:"",messageID:"",time:new Date()},sender:""}];
    let k=0;
    axios.get("http://localhost:5435/users/username",{params:conv.members[0]})
      .then(response =>{
        let index=0
        for (let i = 0; i < response.data.chats.length; i++) {
          
          if(response.data.chats[i].members[0]===getUser().userName)
          {
            index=i
          }
        }
          messagesOther=response.data.chats[index].messages
          for (let i=0 , j=0; i<messagescurr.length&&j<messagesOther.length; ) {          
            if(messagescurr[i].time<messagesOther[j].time){
              allmsg[k]={msg:messagescurr[i],sender:getUser().userName}
              i++;
            }
            else{
              allmsg[k]={msg:messagesOther[j],sender:conv.members[0]}
              j++
            }
            k++;
            if(i===messagescurr.length&&j<messagesOther.length){
              while(j<messagesOther.length){
                allmsg[k]={msg:messagesOther[j],sender:conv.members[0]}
                j++
                k++
              }
            }
            else if(j===messagesOther.length&&i<messagescurr.length){
              while(i<messagescurr.length){
                allmsg[k]={msg:messagescurr[i],sender:getUser().userName}
                i++;
                k++
              }
            }
          }
          
          setmessages(allmsg)
          setGotMessages(true)
          
      }
          );    
    
  }

  const handleSubmit = async (currChat:any) => {
    const message = {
      messageID:JSON.stringify(messages.length+1),
      content: newMessage,
      time: new Date(Date.now()),
    };
    console.log(message);
    
    const res = await axios.get("http://localhost:5435/users/username",{params:currentChat.members[0]})
    const receiverId=res.data._id
    
    socket.current.emit("sendMessage", {
      senderId: getUser()._id,
      sender: getUser().userName,
      receiverId,
      content: newMessage,
    });


    try {
      const res = await axios.put("http://127.0.0.1:5435/chat/addMsg/"+localStorage.getItem('userNameLogged')+'/'+currChat, message);
  
      messages.push({msg:message,sender:getUser().userName});
      setmessages(messages);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
    
    
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper"> 
            <input placeholder="Search for friends"  className="chatMenuInput" value={searchTerm}
             onChange={handleChange}/>
            <ul>
            {openRes&&searchResults.map((item,i) => (
              <li  key={i}> <button onClick={()=>handleClick(item)}>{item}</button></li>))}
            </ul>
            {conversations.map((c, i) => (
              // <div key={i} onClick={() => setCurrentChat(c)}>
              <div  key={i} onClick={() => setChat(c)}>
                <Conversation key={i} conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat.chatID!=="" && gotmessages ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m,i) => (
                    <div key={i} ref={scrollRef}>
                      <Message key={i} item={m}  />
                      </div>
                  ))}
                  
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={()=>{handleSubmit(currentChat.chatID)}} >
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
        {onlineUsers[0]!==""&&
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline onlineUsers={onlineUsers}/>
          </div>
        </div>}
      </div>
    </>
  );
}






