import './createAccount.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getUser, setUser} from '../configStore'

export function CreateAccount() {
    const navigate = useNavigate()
    const url1="http://localhost:5435/users";
    let [formInfo, setFormInfo] = useState({
        firstName:"",
        lastName:"",
        userName: "",
        password: "",
        _id: "",
         followings:[""],
         profilePicture:"",
         followers:[""],
         posts:[{}],
         chats:[{}],
         trips:[{}],
         equipmentList:[{}]
    })

    function textWasChanged(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,whichField: string)
     {
        if(whichField==="confirmPassword"&&(e.target.value!==formInfo["password"])){
            alert("This is not the same password");
        }
        else{
            let newObj = {...formInfo,...{[whichField]: e.target.value}};
            setFormInfo(newObj);
        }
    }

    function createNewAccount(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(formInfo.firstName===""||formInfo.lastName===""||formInfo.userName===""||formInfo.password===""){
            alert("you must fill all fields");
        }
        else{
        //console.log(formInfo);
        axios.get(url1,{params:formInfo})
        .then(response =>{
            console.log(response);
            if(response.data===""){
               setUser(formInfo);

                axios.post("http://localhost:5435/auth/register",getUser())
                .then(response1 => {
                    //navigate('/profile/personalInformation') 
                    navigate('/login')  
                })
            }
            else{
                console.log(response.data);
                
                let users=response.data;
                if (users.userName === formInfo.userName) {
                    alert("This username is already exist , please choose another username")
                }
        }
        })
        }
    }    
    const x=10;
    if(x===10){
    return (
        <div className='createForm'>
            <img src="./images/logo.png" alt="" className="Logo-trip1"/>
            <form id="theLoginForm" onSubmit={(e) => { createNewAccount(e) }}>
                <div className='firstNameFeild'>
                    <input onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textWasChanged(e, "firstName")}}
                        type="text"  id="firstName" name="firstName"  placeholder="First name" />
                </div>
                <div className='lastNameFeild'>
                    <input onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textWasChanged(e, "lastName")}}
                        type="text"  id="lastName" name="lastName"  placeholder="Last name" />
                </div>
                <div className='usernameFeild'>
                    <input onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textWasChanged(e, "userName")}} 
                        type="text"  id="userName" name="userName"  placeholder="username" />
                </div>
                <div className='passwordField'>
                    <input onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textWasChanged(e, "password")}}
                        type="password" id="password" name="password" placeholder="password"/>
                </div>
                <div className='confirmpasswordField'>
                    <input onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textWasChanged(e, "confirmPassword")}}
                        type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password"/>
                </div>
                <div className='createButton'><input type="submit" value="Create"  /></div>
            </form>
        </div>
    )}
    else{
        return(
            <h1>con't got here</h1>
        )
    }
}


