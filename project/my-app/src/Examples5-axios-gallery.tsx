import React, { useState, useEffect } from "react";
import axios from "axios";

export function Examples5() {
    const [isLoading, setLoading] = useState(true);
    const [users, setUsers] = useState([{ name: { first: "", last: "" }, email: "" }]);

    console.log(
        `isLoading is ${isLoading} and users is ${users && users.length > 0}`
    );

    if (users) {
        console.log("users.length =" + users.length)
    }

    const url = 'https://randomuser.me/api/?results=50';


    useEffect(() => {
        console.log("After mount! Let's load data from API...");
        axios.get(url)
            .then(response => {
                console.log("Hurray! We have users data, let's update our state");
                console.log("Calling setUsers...");
                console.log(response.data.results)
                setUsers(response.data.results);
                console.debug("Calling setLoading...");
                setLoading(false);
            });
    }, []);

    if (isLoading) {
        console.debug("renders: Loading...");
        return <div className="App">Loading...</div>;
    }

    console.debug("Finally!! we got results from server");

    return (
        <div className="App">
            {users.map((curr, index) => {
                return <Card  {...curr}></Card>;
            })}
        </div>
    );
}


const Card = (props: { name: { first: string, last: string }, email: string }) => {
    return (<div>
        <ul>
            <li> {props.name.first} </li>
            <li> {props.email} </li>
        </ul>
    </div>)
}

