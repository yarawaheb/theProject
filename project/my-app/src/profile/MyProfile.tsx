
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Post1 } from './Feed';

export  function MyProfile() {
    const username=localStorage.getItem('userNameLogged');
    let [fetching,setFetch] = useState(true);
    let [Posts, setPosts] = useState([
        { 
        postID:0,
        category:"",
        categoryinfo:{},
        comments:[],
        description:"",
        imgUrl: "",
        likes: [],
        location:"",
        name: ""
    }
    ]);
    let url = 'http://127.0.0.1:5435/posts/allThePosts/'+username;

    useEffect(() =>  {

        axios.get(url)
            .then(response => {
                let postArr=[]
                let k=0
                for (let i = 0; i < response.data.length; i++) {
                    for (let j = 0; j < response.data[i].posts.length; j++) {
                        postArr[k] = response.data[i].posts[j];
                        k++;
                        
                    }
                }
                console.log(response.data,time);
                console.log(postArr);
                setPosts(postArr);
                setFetch(false);
            });
    },[]);
    const time =new Date().getTime();
    console.log(Posts,time);
    
    return fetching ?(<>loadong...</>):(
        <div>
           
            {Posts.map((curr, i) => {
                
              return <Post1 key={i} userName={username?username:""} postItem={curr} />
            })} 
           
        </div>
    )
}