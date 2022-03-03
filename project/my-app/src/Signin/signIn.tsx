import './signIn.css';
import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getUser, setUser } from '../configStore';
import { setToken } from './../configStore';
//import { AuthContext } from "../context/AuthContext";


export function Signin() {
    const navigate = useNavigate()
    const url1="http://localhost:5435/users";

    let [formInfo, setFormInfo] = useState({userName: "",password: "",})
    //const { isFetching, dispatch } = useContext(AuthContext);

    function textWasChanged(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,whichField: string)
    {
        let newObj = {...formInfo,...{[whichField]: e.target.value}};
        setFormInfo(newObj);
    }

    function loggedIn(e: React.FormEvent<HTMLFormElement>) 
    {
        e.preventDefault();
        console.log(formInfo);
        if(formInfo.userName===""||formInfo.password===""){
            alert("there are empty fields")
        }
        else{
        axios.get(url1,{params:formInfo})
        .then(response =>{
            let users=response.data;
            console.log(response);
            
                axios.post("http://localhost:5435/auth/login" ,{
                    username:users.userName,
                    password:formInfo.password
                }).then((response1)=>{
                    console.log(response1.data);
                    
                    if (response1.data.user.userName === undefined) {
                        alert(response1.data);}
                    else {
                    console.log(response1.data);
                    localStorage.setItem("token",response1.data.token)
                    localStorage.setItem("userNameLogged",users.userName)
                    localStorage.setItem("firstNameLogged",users.firstName)
                    localStorage.setItem("lastNameLogged",users.lastName)

                    setToken(response1.data.token)
                    setUser(users);
                    navigate('/profile/personalInformation')
                    }})
                    
                })
            }
        }
    if(localStorage.getItem('userNameLogged')!=""){
        localStorage.setItem("userNameLogged","")
        localStorage.setItem("firstNameLogged","")
        localStorage.setItem("lastNameLogged","")        
        return(<Navigate to="/login"/>)
    }
    else{
    return (
        <div className='loginForm'>
            <img src="./images/logo.png" alt="" className="Logo-trip1"/>
            <form  className='theLoginForm' id="theLoginForm" onSubmit={(e) => { loggedIn(e) }}>
                <div className='usernameFeild'>
                    
                    <input onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textWasChanged(e, "userName")}}
                    type="text" required id="userName" name="userName"  placeholder="username" />
                </div>
                <div className='passwordField'>
                    <input onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textWasChanged(e, "password")}}
                    type="password" min={4} required id="password" name="password" placeholder="password"/>
                </div>
                <div className='loginButton'><button id='login' type="submit" >Login</button></div>
                <div className='createAccountbtn'><button ><a  className='createAcoountLink' href="createAccount"> Create new account</a></button></div>
            </form>
        </div>
    )
    }
}



