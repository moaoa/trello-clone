import React from 'react'
import NoStageBoard from '../NoStageBoard/NoStageBoard'
import InProgress from '../InProgressBoard/InProgressBoard'
import CompletedBoard from '../CompletedBoard/CompletedBoard'
import ProjectDetails from '../ProjectDetails/ProjectDetails'
import { useParams } from 'react-router-dom'
import {useSelector} from 'react-redux'


export default function ProjectContainer() {

    
    // const {id} = useParams()
    const project = useSelector(state => state.project)
    return (
        <>
            <ProjectDetails />
            <NoStageBoard tasks={project.noStage} />
            <InProgress tasks={project.inProgress} />
            <CompletedBoard tasks={project.completed} />
            
        </>
    )
}
