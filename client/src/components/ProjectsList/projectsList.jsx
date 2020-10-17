import React from 'react'
import './projectsList.css'
import ProjectItem from '../ProjectItem/ProjectItem'
import {useSelector} from 'react-redux'

function TeamsList() {
    const projects = useSelector(state => state.project)
    

    return (
        <div className='TeamsList'>
            {
                Object.keys(projects).map(key => {
                    const {imgUrl, projectName} = projects[key]
                    return <ProjectItem key={key}  imgUrl={imgUrl} projectName={projectName}/>
                })
            }
        </div>
    )
}

export default TeamsList
