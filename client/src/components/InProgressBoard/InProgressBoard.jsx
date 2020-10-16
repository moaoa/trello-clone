import React from 'react'
import './InProgressBoard.css'
import BoardItem from '../BoardItem/BoardItem'
import {AiOutlinePlus} from 'react-icons/ai'


export default function InProgressBoard({tasks}) {
    if(!tasks) tasks=[]
    return (
        <div className='InProgressBoard'>
        <div className='flex-spaceBetween'><h3 className='badge'>In Progress</h3> <AiOutlinePlus className='addTeamIcon pointer'/></div>
            {
                tasks.map(task => <BoardItem {...task}/>)
            }
        </div>
    )
}
