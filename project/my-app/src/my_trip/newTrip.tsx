import React, { useContext, useState } from 'react'

export default function NewTrip(props:{postItem:{name:String,location:String,imgUrl:String,description:String,category:String}}) {
    console.log(props);

    let [formInfo, setFormInfo] = useState({
        Name: "",
        days:0,
        posts:[props.postItem],
        members:[],
        equipmentList:{},

        })
    function textWasChanged(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,whichField: string)
    {
        let newObj = {...formInfo,...{[whichField]: e.target.value}};
        setFormInfo(newObj);
        console.log(formInfo);
        
    }

    function newTrip(e: React.FormEvent<HTMLFormElement>) 
    {
        e.preventDefault();
    }
  return (
    <div className='newTripForm'>
    <form  className='thenewTripForm' id="newTripForm" onSubmit={(e) => { newTrip(e) }}>
        <div className='nameFeild'>
            <input onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textWasChanged(e, "Name")}}
            type="text"  id="Name" name="Name"  placeholder="trip name" />
        </div>
        <div className='daysFeild'>
            <input onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {textWasChanged(e, "days")}}
            type="text"  id="days" name="days"  placeholder="number of days" />
        </div>
        <div className='addTripButton'><button id='addTrip' type="submit" >create trip</button></div>
    </form>
</div>
  )
}
function postContext(postContext: any) {
    throw new Error('Function not implemented.');
}

