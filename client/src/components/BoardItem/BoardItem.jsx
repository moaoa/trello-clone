import React from 'react'
import './BoardItem.css'
import { Draggable } from 'react-beautiful-dnd';



const BoardItem = ({title, description, id, index}) => {
    return (
        <Draggable draggableId={`${id}`} index={ index }>
            {
            (provided) => (
                <div className='BoardItem cardShadow' 
                    ref={provided.innerRef}
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}
                    >
                    <h4>{title}</h4>
                    <p>{description}</p>
                </div>
                )
            }
        </Draggable>
    )
}

export default BoardItem