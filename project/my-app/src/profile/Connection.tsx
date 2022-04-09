
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getUser } from '../configStore';
import './connections.css'
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
    return /*fetching ?(<><img className='loading' src="./images/loading.gif" alt="" /></>):*/(
        <div className='followers'>
            <ul className='followersAndFollowingsList'>
                <li className='followersList'>
                    <ul>
                    <li><span className='followersTitle'>followers</span></li>
                    {followers.map((curr, i) => (               
                   <li><span key={i}>{curr}</span></li> 
                    ))
                    }
                    </ul>
                </li>
                <li className='followingsList'>
                    <ul>
                   <li><span className='followingsTitle'>followings</span></li> 
                    {followings.map((curr, i) => (               
                    <li><span key={i}>{curr}</span></li>
                    ))
                    }</ul>
                </li>
            </ul>
        </div>
        );
}


