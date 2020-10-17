import React from 'react'
import './ProjectDetails.css'
import MembersSection from '../MembersSection/MembersSection'
import ProjectHead from '../ProjectHead/ProjectHead'

export default function ProjectDetails({projectName}) {
    return (
        <div className='ProjectDetails'>
            <ProjectHead title={projectName} lastModifiedBy='moaad'/>
            <MembersSection/>
        </div>
    )
}
