import React from 'react'
import './NoStageBoard.css'
import BoardItem from '../BoardItem/BoardItem'
import {AiOutlinePlus} from 'react-icons/ai'
import CreateTaskFrom from '../CreateTaskForm/CreateTaskForm'
import { useState } from 'react'


export default function NoStageBoard({tasks}) {
    const [isOpen, setIsOpen] = useState(false)
    const toggleModal= () => setIsOpen(prevState => !prevState)
    if(!tasks) tasks=[]
    return (
        <div className='NoStageBoard'>
            <CreateTaskFrom isOpen={isOpen} toggleModal={toggleModal} operation='noStage' />
        
            <div className='flex-spaceBetween'>
                
                <h3 className='badge'>No Stage</h3>
                 <div onClick={toggleModal}>
                    <AiOutlinePlus className='addTeamIcon pointer'/>
                 </div>
            </div>
            {
                tasks.map(task => <BoardItem key={task.id} {...task}/>)
            }
        </div>
    )
}
