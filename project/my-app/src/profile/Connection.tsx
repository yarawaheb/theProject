
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getUser } from '../configStore';

export  function Connections() {
    let [followers,setFollowers]=useState([])
    let [followings,setFollowings]=useState([])

    let [fetching,setFetch] = useState(true);
    const url="http://127.0.0.1:5435/users/followersAndFollowings/"+getUser().userName

    useEffect(() =>  {
        axios.get(url)
            .then(response => {
                setFollowers(response.data[0].followers)
                setFollowings(response.data[0].followings)
                console.log(followers);
                console.log(followings);


                setFetch(false);
            });
    },[followers,followings]);
    return fetching ?(<>loadong...</>):(
        <div className='followers'>
            <ul>
                <li>
                    <h3>followers</h3>
                    {followers.map((curr, i) => (               
                    <h1 key={i}>{curr}</h1>
                    ))
                    }
                </li>
                <li>
                    <h3>followings</h3>
                    {followings.map((curr, i) => (               
                    <h1 key={i}>{curr}</h1>
                    ))
                    }
                </li>
            </ul>
        </div>
        );
}


