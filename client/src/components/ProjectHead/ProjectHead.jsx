import React from 'react'
import './ProjectHead.css'

export default function ProjectsHead({title, lastModifiedBy}) {
    return (
        <div className='ProjectHead'>
            <h3>{title}</h3>
            {lastModifiedBy && <span>last edited by {lastModifiedBy}</span>}
        </div>
    )
}
