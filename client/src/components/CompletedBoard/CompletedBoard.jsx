import React from 'react'
import './CompletedBoard.css'
import BoardItem from '../BoardItem/BoardItem'
import {AiOutlinePlus} from 'react-icons/ai'


export default function CompletedBoard({tasks}) {
    if(!tasks) tasks=[]
    return (
        <div className='CompletedBoard'>
            <div className='flex-spaceBetween'><h3 className='badge'>Completed</h3> <AiOutlinePlus className='addTeamIcon pointer'/></div>
            {
                tasks.map(task => <BoardItem {...task}/>)
            }
        </div>
    )
}
