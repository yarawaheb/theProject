
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
    },[]);
    return /*fetching ?(<><img className='loading' src="./images/loading.gif" alt="" /></>):*/(
        <div className='followers'>
            <ul className='followersAndFollowingsList'>
                <li className='followersList'>
                    <ul>
                    <li><span className='followersTitle'>Followers</span></li>
                    {followers.map((curr, i) => (               
                   <li className='followersBox'><span className='followersNameSpan' key={i}>{curr}</span><button className='removeBtn'>Remove</button></li> 
                    ))
                    }
                    </ul>
                </li>
                <li className='followingsList'>
                    <ul>
                   <li><span className='followingsTitle'>Followings</span></li> 
                    {followings.map((curr, i) => (               
                    <li className='followingsBox'><span className='followingsNameSpan' key={i}>{curr}</span><button className='unfollowBtn'>Unfollow</button></li>
                    ))
                    }</ul>
                </li>
            </ul>
        </div>
        );
}


