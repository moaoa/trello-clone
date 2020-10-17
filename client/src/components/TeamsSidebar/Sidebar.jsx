import React from 'react'
import './Sidebar.css'
import Header from '../Header/Header'
import TeamsList from '../TeamsList/TeamsList'

function TeamsSidebar() {
    return (
        <div className='TeamsSidebar'>
            <Header/>
            <TeamsList/>
        </div>
    )
}

export default TeamsSidebar
