import React from 'react'
import './projectsList.css'
import ProjectItem from '../ProjectItem/ProjectItem'
import { useSelector } from 'react-redux'

function ProjectsList() {
    const projects = useSelector(state => state.project)
    return (
        <div className='ProjectsList'>
            {
                Object.keys(projects).map(key => {
                    const { imgUrl, projectName } = projects[key]
                    return <ProjectItem key={key} id={key} imgUrl={imgUrl} projectName={projectName} />
                })
            }
        </div>
    )
}

export default ProjectsList
