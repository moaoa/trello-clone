import React from 'react'
import NoStageBoard from '../NoStageBoard/NoStageBoard'
import InProgress from '../InProgressBoard/InProgressBoard'
import CompletedBoard from '../CompletedBoard/CompletedBoard'
import ProjectDetails from '../ProjectDetails/ProjectDetails'
import { Redirect, useParams } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { DragDropContext} from 'react-beautiful-dnd';



export default function ProjectContainer() {
    const {id} = useParams()
    const project = useSelector(state => state.project[id])
    if(!project) return <Redirect to='/'/>
    return (
        <DragDropContext>
            <ProjectDetails projectName={project.projectName} />
            <NoStageBoard tasks={project.noStage} />
            <InProgress tasks={project.inProgress} />
            <CompletedBoard tasks={project.completed} />
        </DragDropContext>
    )
}
