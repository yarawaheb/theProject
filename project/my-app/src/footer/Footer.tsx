import React from 'react'
//import {RiCopyrightLine} from "react-icons/ri";
import { useEffect } from 'react';
//import './footer.css'

export  function Footer1(props: {actionsArr:{Icon:JSX.Element, title: string, url: string }[],footerItems:{string:string ,Icon:JSX.Element, name: string }[]}) {
    
    return (
        <div className="Footerall">
            <div className="actions">
                {props.actionsArr.map((curr,i) =>(
                    <li key={i}><button className={curr.url}>
                         <a href={curr.url}> 
                         <div className="icons">{curr.Icon}</div>
                         <div>{curr.title}</div>
                          </a> </button></li>
                 ))}
            </div>
            
            <div className="Footer1">   
            {props.footerItems.map((curr,i) =>(
                <li key={i}> <div className='all'>
                    <div className="foot">{curr.string}</div>
                    <div className="Yara">{curr.Icon}{curr.name} </div>
                </div> </li>
    ))}</div> 
    </div>
    )
}

