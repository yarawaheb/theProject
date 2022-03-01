import axios from 'axios';
import { useEffect, useState } from 'react';
import { Post } from './Post'


export function Feed() {
    let [Posts, setPosts] = useState([
        { 
        userName:"",
        imgUrl: "", 
        name: "",
        description:"",
        location:"",
        category:"",
        categoryinfo:{},
        likes: [],
        comments:[] 
    }
    ]);
    let url = 'http://127.0.0.1:5435/posts/allPosts';

    useEffect(() => {

        axios.get(url)
            .then(response => {
                console.log(response.data);

                setPosts(response.data.posts);
                setPosts(response.data.userName)
            });
    },[])

    return (
        <div>
            
            {/* {Posts.map((curr, i) => (
                
                 <Post key={i} postItems={curr}  />

            ))} */}
           
        </div>
    )
}
