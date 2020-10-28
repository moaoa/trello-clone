import constants from './constants'
import sendProjectData from '../../API/sendProjectData'

export const addTask = (projectId, stageName, task) => ({type: constants.ADD_TASK, stageName, task, projectId})

export const createProjectStart = () => ({type: constants.CREATE_PROJECT_START})
export const createProjectSuccess = (payload) => ({type: constants.CREATE_PROJECT_SUCCESS, payload})
export const createProjectFailure = (payload) => ({type: constants.CREATE_PROJECT_FAILURE, payload})
export const createProjectAsync = (payload) => {
    return (dispatch, /* getState */) => {
        dispatch(createProjectStart())
        sendProjectData(payload)
        .then(response => {
            if(response.status === 201) dispatch(createProjectSuccess(response.data.project))
            else dispatch(createProjectFailure(response.statusText))
        })
        .catch(err => dispatch(createProjectFailure(err)))
    }
}
export const moveCard = (payload) => ({type: constants.MOVE_CARD, payload})
export const moveCardToEmptyStage = (payload) => ({type: constants.MOVE_CARD_TO_EMPTY_STAGE, payload})