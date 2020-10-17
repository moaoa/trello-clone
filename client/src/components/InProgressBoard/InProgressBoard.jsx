import React, {useState} from 'react'
import './InProgressBoard.css'
import BoardItem from '../BoardItem/BoardItem'
import {AiOutlinePlus} from 'react-icons/ai'
import {useDispatch} from 'react-redux'
import CreateTaskForm from '../CreateTaskForm/CreateTaskForm'


export default function InProgressBoard({tasks}) {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const toggleModal= () => setIsOpen(prevState => !prevState)
    if(!tasks) tasks=[]
    return (
        <div className='InProgressBoard'>
            <div className='flex-spaceBetween'>
                <h3 className='badge'>In Progress</h3>
                <div onClick={toggleModal}><AiOutlinePlus className='addTeamIcon pointer' /></div>
                <CreateTaskForm operation='inProgress' dispatch={dispatch} isOpen={isOpen} toggleModal={toggleModal}/>
            </div>
            {
                tasks.map(task => <BoardItem {...task}/>)
            }
        </div>
    )
}
