import axios from "axios";

export let newUser={firstName:"", lastName: "", userName: "" ,password:"",_id:"",followings:[""]};
export let token="";
export function setToken(token:string){
    newUser.firstName=token;
}
export function getToken(){
    return token;
}
export function setUser(user:{firstName:string, lastName: string, userName: string ,password:string,_id:string,followings:string[]}){
    newUser.firstName=user.firstName;
    newUser.lastName=user.lastName;
    newUser.userName=user.userName;
    newUser.password=user.password;
    newUser._id=user._id;
    newUser.followings=user.followings;
    //console.log(newUser);
    
}
export function setFirstName(firstName:any){
    newUser.firstName=firstName;
}
export function setLastName(lastName:any){
    newUser.lastName=lastName;
}
export function setpassword(password:string){
    newUser.password=password;
}
export function getUser(cb?: React.Dispatch<React.SetStateAction<{
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    _id: string;
    followings: string[];
}>>){
   const userName=localStorage.getItem('userNameLogged');

    axios.get("http://localhost:5435/users/username",{params:userName})
    .then(response =>{
        let user=response.data;
        if (cb) {
            cb(user);
        } else {
            setUser(user);
        }
    }
        );

 
return newUser;
}