import React, {useState} from 'react'
import './InProgressBoard.css'
import BoardItem from '../BoardItem/BoardItem'
import {AiOutlinePlus} from 'react-icons/ai'
import CreateTaskForm from '../CreateTaskForm/CreateTaskForm'
import { useParams } from 'react-router-dom'
import { moveCardToEmptyStage } from '../../redux/actions/project'
import { useDispatch } from 'react-redux'


export default function InProgressBoard({tasks}) {
    if(!tasks) tasks=[]
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const urlParams  = useParams()
    const toggleModal= () => setIsOpen(prevState => !prevState)
    
    return (
        <div className={`InProgressBoard`}>
            <div className='flex-spaceBetween'>
                <h3 className='badge'>In Progress</h3>
                <div onClick={toggleModal}><AiOutlinePlus className='addTeamIcon pointer' /></div>
                <CreateTaskForm operation='inProgress' isOpen={isOpen} toggleModal={toggleModal}/>
            </div>
            {
                tasks.map((task, index) => <BoardItem stage='inProgress' key={task.id} {...task} index={index} />)
            }
        </div>
    )
}
