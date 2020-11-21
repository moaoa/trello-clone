import React from 'react'
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
    const token = useSelector(state => state.auth.user.token)
    if(!project) return <Redirect to='/'/>
    return ( 
     
        <DragDropContext onDragEnd={result =>{
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
            <NoStageBoard tasks={project.noStage} />
            <InProgress tasks={project.inProgress} />
            <CompletedBoard tasks={project.completed} />
        </DragDropContext>
    )
}
