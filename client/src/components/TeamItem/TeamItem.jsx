import React from 'react'
import './TeamItem.css'


function TeamItem({Icon, teamName}) {
    return (
        <div className='TeamItem pointer'>
            <Icon  className="team-icon" />
            <span className='teamName'>{teamName}</span>
        </div>
    )
}

export default TeamItem
