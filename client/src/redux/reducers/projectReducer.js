import constants from '../actions/constants'
import generateId, {createProjectUtil, moveCardToEmptyCardUtil, moveCardUtil} from './projectUtils'

const initailState = {
    Project :{
        projectName: 'Project',
        imgUrl:'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
        admin:'',
        members:[],
        noStage: [],
        inProgress: [],
        completed: []
    },
    Project2:{
        projectName: 'Project2',
        imgUrl:'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
        admin:'',
        members:[],
        noStage: [],
        inProgress: [],
        completed: []
    }
}


const projectReducer = (state = initailState, action) => {
    switch(action.type){
        case constants.ADD_TASK:
            return {
                ...state,
                [action.projectId]:{
                    ...state[action.projectId],
                    [action.stageName]: [...state[action.projectId][action.stageName], {...action.task, id: generateId()}]
                }
            }
        case constants.CREATE_PROJECT:
            return {
                ...state,
                [action.payload.projectName]: createProjectUtil(action.payload) 
            }
        case constants.MOVE_CARD:
            return {
                ...state,
                [action.payload.projectName]: moveCardUtil(state[action.payload.projectName], action.payload)
            }
        case constants.MOVE_CARD_TO_EMPTY_STAGE:
            return {
                ...state,
                [action.payload.projectId]: moveCardToEmptyCardUtil(state[action.payload.projectId], action.payload)
            }
        default: return state
    }
}

export default projectReducer