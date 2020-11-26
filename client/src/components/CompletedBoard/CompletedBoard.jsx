import React, {useState} from 'react'
import './CompletedBoard.css'
import BoardItem from '../BoardItem/BoardItem'
import {AiOutlinePlus} from 'react-icons/ai'
import CreateTaskForm from '../CreateTaskForm/CreateTaskForm'
import DroppableHoc from '../../Hoc/DroppableHoc'



export default DroppableHoc(function CompletedBoard({tasks, provided, isDraggingOver}) {
    if(!tasks) tasks=[]
    const [isOpen, setIsOpen] = useState(false)
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
                >
            {
                tasks.map((task, index) => <BoardItem stage='inProgress' key={task.id} {...task} index={index} />)
            }
            </div>
            {provided.placeholder}
        </div>
    )
}, "completed")
