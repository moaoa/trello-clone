import React, {useState} from 'react'
import './CompletedBoard.css'
import BoardItem from '../BoardItem/BoardItem'
import {AiOutlinePlus} from 'react-icons/ai'
import {useDispatch} from 'react-redux'
import CreateTaskForm from '../CreateTaskForm/CreateTaskForm'


export default function CompletedBoard({tasks}) {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const toggleModal= () => setIsOpen(prevState => !prevState)
    if(!tasks) tasks=[]
    return (
        <div className='CompletedBoard'>
            <div className='flex-spaceBetween'>
                <h3 className='badge'>Completed</h3>
                <div onClick={toggleModal}><AiOutlinePlus className='addTeamIcon pointer' /></div>
                <CreateTaskForm operation='completed' dispatch={dispatch} isOpen={isOpen} toggleModal={toggleModal}/>
            </div>
            {
                tasks.map(task => <BoardItem {...task}/>)
            }
        </div>
    )
}
