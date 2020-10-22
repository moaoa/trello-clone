import React, {useState} from 'react'
import './CompletedBoard.css'
import BoardItem from '../BoardItem/BoardItem'
import {AiOutlinePlus} from 'react-icons/ai'
import CreateTaskForm from '../CreateTaskForm/CreateTaskForm'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import DroppableHoc from '../../Hoc/DroppableHoc'



export default DroppableHoc(function CompletedBoard({tasks, provided, isDraggingOver}) {
    if(!tasks) tasks=[]
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const urlParams  = useParams()
    const toggleModal= () => setIsOpen(prevState => !prevState)
    
    return (
        <div className={`CompletedBoard`} >
            <div className='flex-spaceBetween'>
                <h3 className='badge'>Completed</h3>
                <div onClick={toggleModal}><AiOutlinePlus className='addTeamIcon pointer' /></div>
                <CreateTaskForm operation='inProgress' isOpen={isOpen} toggleModal={toggleModal}/>
            </div>

            <div className="tasks" 
                {...provided.droppableProps} 
                ref={provided.innerRef} 
                style={{backgroundColor: isDraggingOver ? 'lightgray': '#f4f7f9'}} 
            >
            {
                tasks.map((task, index) => <BoardItem stage='inProgress' key={task.id} {...task} index={index} />)
            }
            </div>
            {provided.placeholder}
        </div>
    )
}, "completed")