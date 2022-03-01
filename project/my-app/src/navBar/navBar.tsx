import { IconBase, icons } from 'react-icons/lib';
import { cursorTo } from 'readline';
import './navBar.css';

export function Navbar1(props: { navItems: {Icon:JSX.Element, title: string, url: string }[],logoImageUrl: string }) {

    return (
        <div className="Navbar1">
            <div className="allItems">
                <div><a href={props.navItems[0].url}><img src={props.logoImageUrl} className="Logo-trip" alt="logo" /></a> </div>
                <ul className="searchItems"><input type="text" name="search" className="searchInput" placeholder="What are you looking for?"></input> </ul>
                <ul className="pagesItemsUl">
                    {props.navItems.map((curr, i) => (
                        
                        <li key={i}> <a href={curr.url}> {curr.Icon} {func(curr.title)}</a> </li>
                        
                    ))}
                </ul>

            </div>

        </div>
    )
}

function func(title: string) {//need to fix (recive number as parameter)
    if (title==="Notifications"||title==="Inbox") {
      return  <span className={title}>1</span> } 
}
