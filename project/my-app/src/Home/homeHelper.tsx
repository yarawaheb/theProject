//import "./homeHelper.css"
export function Mooto (props: {mottoAtr:{Icon:JSX.Element, mottoQuote: string}[]}){
    return(
        <div className="motto1">
            <div className="mottoQuote">{props.mottoAtr[0].mottoQuote}</div>
                
        </div>
    
    )
};
export function Hiking (props: {Images:{src:string , title:string ,url:string}[]}){
    return(
        <div className="brands">
            {props.Images.map((curr,i) =>(
                <li key={i} className="container"><a href={curr.url}><img src={curr.src} title={curr.title}/></a></li>
    
                
    ))}
    </div>
    )
};
export function Camping (props: {Images:{src:string , title:string ,url:string}[]}){
    return(
        <div className="brands">
            {props.Images.map((curr,i) =>(
                <li key={i} className="container"><a href={curr.url}><img src={curr.src} title={curr.title}/></a></li>
    
                
    ))}
    </div>
    )
};
export function Attractions (props: {Images:{src:string , title:string ,url:string}[]}){
    return(
        <div className="brands">
            {props.Images.map((curr,i) =>(
                <li key={i} className="container"><a href={curr.url}><img src={curr.src} title={curr.title}/></a></li>
    
                
    ))}
    </div>
    )
}



