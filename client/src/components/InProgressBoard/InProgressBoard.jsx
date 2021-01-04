import React, {useState} from 'react'
import './InProgressBoard.css'
import BoardItem from '../BoardItem/BoardItem'
import {AiOutlinePlus} from 'react-icons/ai'
import CreateTaskForm from '../CreateTaskForm/CreateTaskForm'
import DroppableHoc from '../../Hoc/DroppableHoc'


export default DroppableHoc(function InProgressBoard({tasks, provided, isDraggingOver, disabled}) {
    if(!tasks) tasks=[]
    const [isOpen, setIsOpen] = useState(false)
    const toggleModal= () => setIsOpen(prevState => !prevState)
    
    return (
        <div className={`InProgressBoard`}
        style={{
            transition: 'all 0.5s ease',
            background: isDraggingOver? '#dbdee0': ''
        }} >
            <div className='flex-spaceBetween'>
                <h3 className='badge'>In Progress</h3>
                <div onClick={toggleModal}><AiOutlinePlus className='addTeamIcon pointer' /></div>
                <CreateTaskForm operation='inProgress' isOpen={isOpen} toggleModal={toggleModal}/>
            </div>

            <div className="tasks"
                {...provided.droppableProps} 
                ref={provided.innerRef}
                >
            {
                tasks.map((task, index)=> <BoardItem stage='inProgress' key={task._id} {...task} index={index} disabled={disabled} />)
            }
            </div>
            {provided.placeholder}
        </div>
    )
}, "inProgress")