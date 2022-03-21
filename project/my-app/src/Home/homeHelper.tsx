import "./homeHelper.css"
export function Mooto (props: {mottoAtr:{Icon:JSX.Element, mottoQuote: string}[]}){
    return(
        <div className="motto1">
            <div className="mottoQuote">{props.mottoAtr[0].mottoQuote}</div>
                
        </div>
    
    )
};
