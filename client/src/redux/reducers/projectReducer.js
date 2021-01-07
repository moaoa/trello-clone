import constants from '../actions/constants'
import generateId, { moveCardUtil, setProjects} from './projectUtils'



const projectReducer = (state = {}, action) => {
    console.log(action);
    switch(action.type){
        case constants.SET_PROJECTS:
            return setProjects(action.payload)
        case constants.ADD_TASK_SUCCESS:
            return {
                ...state,
                [action.projectId]:{
                    ...state[action.projectId],
                    [action.stageName]: [...state[action.projectId][action.stageName], {...action.task, id: generateId()}]
                }
            }
        case constants.CREATE_PROJECT_SUCCESS:
        let project = action.payload
            return {
                ...state,
                [project._id]: project
            }
        case constants.MOVE_CARD:
            return {
                ...state,
                [action.payload.projectId]: moveCardUtil(state[action.payload.projectId], action.payload)
            }
        case constants.ADD_MEMBER: 
            return {
                ...state,
                [action.payload.projectId] : {

                    ...state[action.payload.projectId],

                     members: [
                         ...state[action.payload.projectId].members,
                        action.payload.member
                     ]
                    }
            }

        case constants.EDIT_PROJECT:
            return {
                ...state,
                [action.payload.project._id] : action.payload.project
            }
       
        default: return state
    }
}

export default projectReducer