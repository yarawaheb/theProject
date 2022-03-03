import { useState } from "react";

export function Post1(props:{postItem: {category:string,categoryinfo:Object,comments:Array<any>,description:string, imgUrl: string,likes:Array<any>, location:string,name: string } })
     {
        //let [isOpen, setIsOpen] = useState(false)
        console.log(props);
        
        return (
            <div className="aroundAll">
                <div className="post">
                    <div className="postWrapper">
                        <div className="postTop">
                            <div className="postTopLeft">
                                <span className="postUsername">
                                    {/* {props.userName} */}

                                </span>
                            </div>
                        </div>
                        <div className="postCenter">
                            <img className="postImg" src={props.postItem.imgUrl} />
                            <p> {props.postItem.location} </p>
                            <p> {props.postItem.description} </p>
                        </div>
                        {/* {isOpen&& <mytrips/>} */}
                        <div className="category">
                            {props.postItem.category}
                        </div>
                        <div className="categoryinfi">
                            {props.postItem.categoryinfo}
                        </div>
                        {/* <button onClick={()=>{setIsOpen(!isOpen)}}>add to my trip</button> */}
                                
                        
                    </div>
                </div>
            </div>
        );
        }
        
   




