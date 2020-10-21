import React from 'react'
import './BoardItem.css'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { moveCard } from '../../redux/actions/project'
import { Draggable } from 'react-beautiful-dnd';



const BoardItem = ({title, description, id, index, stage}) => {
    const dispatch = useDispatch()
    const params = useParams()
 

    return (
        <Draggable draggableId={`${id}`} index={index}>
            {
            (provided) => (
                <div className='BoardItem cardShadow' 
                    ref={provided.innerRef}
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}
                    >
                    <h4>{title}</h4>
                    <p>{description}</p>
                </div>)
            }
        </Draggable>
    )
}

export default BoardItem