import { IconBase, icons } from 'react-icons/lib';
import { Navigate } from 'react-router-dom';
import { cursorTo } from 'readline';
import './navBar.css';

export function Navbar1(props: { navItems: {Icon:JSX.Element, title: string, url: string }[],logoImageUrl: string }) {

    return (
        <div className="Navbar1">
            <div className="allItems">
                <div><a href={props.navItems[0].url}><img src={props.logoImageUrl} className="Logo-trip" alt="logo" /></a> </div>
                <ul className="searchItems"><span className='motto' >Don't Listen to what they Say, Go and Discover !</span> </ul>
                <ul className="pagesItemsUl">
                    <li > <a href={props.navItems[5].url}> {props.navItems[5].Icon} </a> </li>

                </ul>

            </div>

        </div>
    )
}

function func(title: string) {//need to fix (recive number as parameter)
    if (title==="Notifications"||title==="Inbox") {
      return  <span className={title}>1</span> } 
}

export function SideBar (props: { navItems: {Icon:JSX.Element, title: string, url: string }[]}) {

    return(
        <div className='sideBar'>
            <ul>
                {props.navItems.map((curr,i)=>{
                     return <li className={'sideItem'} > <a href={curr.url} tabIndex={1}>{curr.Icon} {curr.title}</a> </li>
                    // return <li key={i}><button className='proact' onClick={() => {<Navigate to={curr.url}/>}}>
             
                    // <div className="picons">{curr.Icon}</div>
                    // <div>{curr.title}</div>
                    //   </button></li>
                })}
            </ul>
        </div>
    )
}