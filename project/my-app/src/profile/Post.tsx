import { useEffect, useState } from "react"
import { MoreVert } from "@material-ui/icons";

import axios from "axios";
import { Star } from "@material-ui/icons";

export function Post(props: { postItems: { 
    userName: string
    imgUrl: string, 
    name: string,
    description:string,
    location:string,
    category:string,
    categoryinfo:Object,
    likes: Array<any>,
    comments:Array<any> } }) {

        // const [like, setLike] = useState(props.postItems.like.length);
        // const [isLiked, setIsLiked] = useState(false);
        const [isOpen, setisOpen] = useState(false);

        const likeHandler = () => {
            // setLike(isLiked ? like + 1 : like - 1)
            // setIsLiked(!isLiked)
        }

        return (
            <div className="aroundAll">
                <div className="post">
                    <div className="postWrapper">
                        <div className="postTop">
                            <div className="postTopLeft">
                                <span className="postUsername">
                                    {props.postItems.userName}

                                </span>
                            </div>
                        </div>
                        <div className="postCenter">
                            <img className="postImg" src={props.postItems.imgUrl} />
                            <p> {props.postItems.location} </p>
                            <p> {props.postItems.description} </p>

                        </div>
                        <div className="category">
                            {props.postItems.category}
                        </div>
                        <div className="categoryinfi">
                            {props.postItems.categoryinfo}
                        </div>
                                
                        
                    </div>
                </div>
            </div>
        );
        }
        
    




