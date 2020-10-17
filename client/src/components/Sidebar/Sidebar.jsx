import React from 'react'
import './Sidebar.css'
import Header from '../Header/Header'
import ProjectsList from '../ProjectsList/projectsList'

function TeamsSidebar() {
    return (
        <div className='TeamsSidebar'>
            <Header/>
            <ProjectsList/>
        </div>
    )
}

export default TeamsSidebar
