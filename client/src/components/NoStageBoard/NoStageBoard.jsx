import React from 'react'
import './NoStageBoard.css'
import BoardItem from '../BoardItem/BoardItem'
import {AiOutlinePlus} from 'react-icons/ai'
import Modal from '../Modal/Modal'
import {addTask} from '../../redux/actions/tasks'
import {useDispatch} from 'react-redux'
import { useState } from 'react'


export default function NoStageBoard({tasks}) {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    if(!tasks) tasks=[]
    return (
        <div className='NoStageBoard'>
        <Modal isOpen={isOpen}>
            <div>test</div>
        </Modal>
            <div className='flex-spaceBetween'>
                
                <h3 className='badge'>No Stage</h3>
                 <div onClick={() => setIsOpen(prevState => !prevState)}>
                    <AiOutlinePlus className='addTeamIcon pointer'/>
                 </div>
            </div>
            {
                tasks.map(task => <BoardItem key={task.id} {...task}/>)
            }
        </div>
    )
}
//dispatch(addTask('noStage', {title: 'new title ', description: 'descripotion from redux'}))