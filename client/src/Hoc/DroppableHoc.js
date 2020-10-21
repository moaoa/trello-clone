import React from 'react'
import { Droppable } from 'react-beautiful-dnd';


const DroppableHoc = (Component, stage) => {
    return (props) => (
        <Droppable droppableId={stage} >
            {
                ( provided )=> <Component provided={provided} {...props}/>
            }
        </Droppable>
        )
}

export default DroppableHoc