import React from 'react'
import './NoStageBoard.css'
import BoardItem from '../BoardItem/BoardItem'
import {AiOutlinePlus} from 'react-icons/ai'
import CreateTaskFrom from '../CreateTaskForm/CreateTaskForm'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { moveCardToEmptyStage } from '../../redux/actions/project'
import { useDispatch } from 'react-redux'
import DroppableHoc from '../../Hoc/DroppableHoc'



export default DroppableHoc(function NoStageBoard({tasks, provided, isDraggingOver}) {
    if(!tasks) tasks=[]
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const urlParams  = useParams()
    const toggleModal= () => setIsOpen(prevState => !prevState)

  
    return (
        <div className={`NoStageBoard`}
         >
            <CreateTaskFrom isOpen={isOpen} toggleModal={toggleModal} operation='noStage' />
            <div className='flex-spaceBetween'  >
                <h3 className='badge'>No Stage</h3>
                 <div onClick={toggleModal}>
                    <AiOutlinePlus className='addTeamIcon pointer'/>
                 </div>
            </div>

            <div className="tasks" 
                {...provided.droppableProps} 
                ref={provided.innerRef} 
                style={{backgroundColor: isDraggingOver? 'lightgray': '#f4f7f9'}}
            >
            {
                tasks.map((task, index)=> <BoardItem stage='noStage' key={task._id} {...task} index={index}  />)
            }
            </div>
            {provided.placeholder}
        </div>
    )
}, 'noStage')
