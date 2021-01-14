import React from 'react'
import "./ProjectContainer.css"
import NoStageBoard from '../NoStageBoard/NoStageBoard'
import InProgress from '../InProgressBoard/InProgressBoard'
import CompletedBoard from '../CompletedBoard/CompletedBoard'
import ProjectDetails from '../ProjectDetails/ProjectDetails'
import { Redirect, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DragDropContext} from 'react-beautiful-dnd';
import { moveCard } from '../../redux/actions/project'
import Axios from 'axios'



export default function ProjectContainer() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const project = useSelector(state => state.project[id])
    const user = useSelector(state => state.auth.user)
    const token = user.token
    
    if(!project) return <Redirect to='/'/>
    const disabled = project.admin._id !== user._id
    return ( 
     
        <DragDropContext 
            onDragEnd={result =>{
            const {destination, source} = result
                        
            if(!destination ) return 
            if (
                destination.droppableId === source.droppableId &&
                destination.index === source.index
              ) {
                return
              }

              const dragData = {
                projectId: id,
                dragStage: result.source.droppableId,
                dropStage: result.destination.droppableId,
                dragIndex: result.source.index,
                hoverIndex: result.destination.index
            }
              dispatch(
                moveCard(dragData)
              )
              Axios({
                  method: 'PUT',
                  url: '/projects/',
                  headers:{
                      authorization: 'Bearer ' + token
                  },
                  data:dragData
              }).then(res => {
                  if(res.status === 200) console.log(res.status);
              })
              .catch(console.log)
           
        }}>
            <ProjectDetails projectName={project.projectName} />
            <div className={"project-container"}>
                <NoStageBoard tasks={project.noStage} disabled={disabled} />
                <InProgress tasks={project.inProgress} disabled={disabled} />
                <CompletedBoard tasks={project.completed} disabled={disabled} />
            </div>
        </DragDropContext>
    )
}
