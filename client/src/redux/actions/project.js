import constants from './constants'
import sendProjectData from '../../API/sendProjectData'
import Axios from 'axios'
import { toast } from 'react-toastify';

export const addTask = (projectId, stageName, task) => ({type: constants.ADD_TASK_SUCCESS, stageName, task, projectId})
export const addTaskAsync = (projectId, stageName, task) => {
    return (dispatch, getState) => {
        const state = getState()
        Axios.post('/projects/task', {projectId, stageName, task}, {
            headers:{
                authorization: 'Bearer ' + state.auth.user.token
            }
        })
        .then(res => {
            if(res.status === 200) dispatch(addTask(projectId, stageName, task))
        })
        .catch(e => {
            toast.error('something went wrong')
            console.log(e);
        })
    }
}

export const createProjectStart = () => ({type: constants.CREATE_PROJECT_START})
export const createProjectSuccess = (payload) => ({type: constants.CREATE_PROJECT_SUCCESS, payload})
export const createProjectFailure = (payload) => ({type: constants.CREATE_PROJECT_FAILURE, payload})
export const createProjectAsync = (payload) => {
    return (dispatch, getState ) => {
        const {auth: {user: {token}}} = getState()
        dispatch(createProjectStart())

        sendProjectData(payload, token)
        .then(response => {
            if(response.status === 201) dispatch(createProjectSuccess(response.data.project))
            else dispatch(createProjectFailure(response.statusText))
        })
        .catch(err => dispatch(createProjectFailure(err)))
    }
}
export const moveCard = (payload) => ({type: constants.MOVE_CARD, payload})
export const setProjects = (payload) => ({type: constants.SET_PROJECTS, payload})

// invite actions
export const addInvite = (invite) => ({type: constants.ADD_INVITE, payload: invite})
export const removeInvite = (invite) => ({type: constants.REMOVE_INVITE, payload: invite})
export const addMember = (member, projectId) => ({type: constants.ADD_MEMBER, payload: { member, projectId } })
export const editProject  = (project) => ({type: constants.EDIT_PROJECT, payload: {project}})