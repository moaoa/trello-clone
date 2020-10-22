import React from 'react'
import { Droppable } from 'react-beautiful-dnd';


const DroppableHoc = (Component, stage) => {
    return (props) => (
        <Droppable droppableId={stage} >
            {
                ( provided, snapshot )=> <Component provided={provided} isDraggingOver={snapshot.isDraggingOver} {...props}/>
            }
        </Droppable>
        )
}

export default DroppableHoc