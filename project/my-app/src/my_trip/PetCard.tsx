import React from 'react'
import { useDrag } from 'react-dnd'

export const PetCard = ( id:Number, name:string ) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: 'pet',
        item: { id, name },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })
    return (
        <div className='pet-card' ref={dragRef}>
            {name}
            {isDragging && '😱'}
        </div>
    )
}