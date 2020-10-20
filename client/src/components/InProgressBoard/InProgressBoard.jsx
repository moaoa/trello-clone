import React, {useState} from 'react'
import './InProgressBoard.css'
import BoardItem from '../BoardItem/BoardItem'
import {AiOutlinePlus} from 'react-icons/ai'
import CreateTaskForm from '../CreateTaskForm/CreateTaskForm'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../../dragAndDropUtils/utils'
import { useParams } from 'react-router-dom'
import { moveCardToEmptyStage } from '../../redux/actions/project'
import { useDispatch } from 'react-redux'


export default function InProgressBoard({tasks}) {
    if(!tasks) tasks=[]
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const urlParams  = useParams()
    const toggleModal= () => setIsOpen(prevState => !prevState)
    const [{isOver}, drop]  = useDrop({
        accept: ItemTypes.CARD,
        collect: (monitor) => ({isOver: monitor.isOver()}),
        drop: (item, monitor) => {
            if(tasks.length === 0 ) {
               dispatch( moveCardToEmptyStage(
                {
                    projectId: urlParams.id,
                    dragedFrom: item.dragStage,
                    dropStage: 'inProgress',
                    dragIndex: item.index
                }
            ))
            }
        }
    })
    return (
        <div className={`InProgressBoard ${isOver? 'bg-darker': ''}`} ref={drop}>
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
