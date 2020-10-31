import React from 'react'
import './ProjectItem.css'
import { NavLink } from 'react-router-dom'


function ProjectItem({imgUrl, projectName, id}) {
    return (
        <NavLink to={`/project/${id}`}>
            <div className='ProjectItem pointer'>
                <img src={imgUrl} alt=""/>
                <span className='ProjectName'>{projectName}</span>
            </div>
        </NavLink>
    )
}

export default ProjectItem
