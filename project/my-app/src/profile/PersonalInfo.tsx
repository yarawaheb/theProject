import './personInfo.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { getUser, setFirstName, setLastName, setpassword, setUser } from '../configStore';

export function Personalinfo(props: { newUser: any}) {
    const url="http://localhost:5435/users/us";
    var url1="http://localhost:5435/users/";
    const state = {button: 1};
    const navigate = useNavigate()
    let [formInfo, setFormInfo] = useState({
        firstName:"",
        lastName:"",
        userName: "",
        password: "",
    })

   
    function textWasChanged(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,whichField: string)
     {
        let newObj = {...formInfo,...{[whichField]: e.target.value}};        
        setFormInfo(newObj);
    }
    function updateInfo(e: React.FormEvent<HTMLFormElement>) {
        if (state.button === 2) {
            e.preventDefault();
            if(formInfo.firstName!==""){
                setFirstName(formInfo.firstName);
            }
            if(formInfo.lastName!==""){
                setLastName(formInfo.lastName);
            }
            if(formInfo.password!==""){
                setpassword(formInfo.password);
            }
            url1= url1+getUser().userName;
            axios.put(url1,getUser())
            .then(response1 => {
                console.log(response1.data);})
                alert("user updated")
        }
        if (state.button === 1) {
            url1= url1+getUser().userName;
            axios.delete(url1)
            .then(response2 => {
                console.log(response2.data);})
                navigate('/login')
        }
    }

    return (
        <div className='personalinfoForm'>
            <form id="personalinfor" onSubmit={(e) => { updateInfo(e) }}>          
                <div className='ifirstNameFeild'>
                    <label htmlFor="">First name</label>
                    <input onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textWasChanged(e, "firstName")}}
                    type="text"  id="firstName" name="firstName" defaultValue={getUser().firstName}  />
                </div>
                <div className='ilastNameFeild'>
                    <label htmlFor="">Last name</label>
                    <input onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textWasChanged(e, "lastName")}}
                    type="text"  id="lastName" name="lastName"   defaultValue={getUser().lastName}/>
                </div>
                <div className='iusernameFeild'>
                    <label htmlFor="">Username</label>
                    <input onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textWasChanged(e, "userName")}}
                    type="text"  id="userName" name="userName"  disabled={true} defaultValue={getUser().userName}/>
                </div>
                <div className='ipasswordField'>
                    <label htmlFor="">new password</label>
                    <input onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textWasChanged(e, "password")}}
                    type="text" id="password" name="password"  />
                </div>                
                
            <li> 
                <button className='updatebtn' id='update' type="submit" onClick={() => (state.button = 2)} >Update</button>
                <button className='deletebtn' id='delete' type="submit" onClick={() => (state.button = 1)} >Delete account</button>
            </li>
            </form>
        </div>
    )
}

