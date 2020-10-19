import React from 'react'
import './Sidebar.css'
import Header from '../Header/Header'
import ProjectsList from '../ProjectsList/projectsList'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../../dragAndDropUtils/utils'

function TeamsSidebar() {
    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.CARD,
        drop: (item, monitor) => console.log(item),
        collect: monitor => ({isOver: monitor.isOver()})

    })
    return (
        <div className='TeamsSidebar' ref={drop}>
            <Header/>
            <ProjectsList/>
        </div>
    )
}

export default TeamsSidebar
