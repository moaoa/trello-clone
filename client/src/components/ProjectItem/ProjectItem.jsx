import React from 'react'
import './ProjectItem.css'
import { NavLink } from 'react-router-dom'


function ProjectItem({imgUrl, projectName}) {
    return (
        <NavLink to={`/project/${projectName}`}>
            <div className='ProjectItem pointer'>
                <img src={imgUrl} alt=""/>
                <span className='ProjectName'>{projectName}</span>
            </div>
        </NavLink>
    )
}

export default ProjectItem
