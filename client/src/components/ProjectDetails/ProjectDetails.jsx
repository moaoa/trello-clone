import React from 'react'
import './ProjectDetails.css'
import MembersSection from '../MembersSection/MembersSection'
import ProjectHead from '../ProjectHead/ProjectHead'

export default function ProjectDetails() {
    return (
        <div className='ProjectDetails'>
            <ProjectHead title='project 1' lastModifiedBy='moaad'/>
            <MembersSection/>
        </div>
    )
}
