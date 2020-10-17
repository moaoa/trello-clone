import React from 'react'
import './ProjectDetails.css'
import MembersSection from '../MembersSection/MembersSection'
import ProjectHead from '../ProjectHead/ProjectHead'
import {useSelector} from 'react-redux'

export default function ProjectDetails() {
    const project = useSelector(state => state.project)
    return (
        <div className='ProjectDetails'>
            <ProjectHead title={project.projectName} lastModifiedBy='moaad'/>
            <MembersSection/>
        </div>
    )
}
