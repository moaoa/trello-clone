import React from 'react'
import './NoStageBoard.css'
import BoardItem from '../BoardItem/BoardItem'
import {AiOutlinePlus} from 'react-icons/ai'
import {addTask} from '../../redux/actions/tasks'
import {useDispatch} from 'react-redux'


export default function NoStageBoard({tasks}) {
    const dispatch = useDispatch()
    if(!tasks) tasks=[]
    return (
        <div className='NoStageBoard'>
            <div className='flex-spaceBetween'>
                
                <h3 className='badge'>No Stage</h3>
                 <div onClick={() => dispatch(addTask('noStage', {title: 'new title ', description: 'descripotion from redux'}))}>
                    <AiOutlinePlus className='addTeamIcon pointer'/>
                 </div>
            </div>
            {
                tasks.map(task => <BoardItem key={task.id} {...task}/>)
            }
        </div>
    )
}
