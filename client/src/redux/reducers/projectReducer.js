import constants from '../actions/constants'
import generateId, { moveCardUtil, setProjects} from './projectUtils'



const projectReducer = (state = {}, action) => {
    switch(action.type){
        case constants.SET_PROJECTS:
            return setProjects(action.payload)
        case constants.ADD_TASK:
            return {
                ...state,
                [action.projectId]:{
                    ...state[action.projectId],
                    [action.stageName]: [...state[action.projectId][action.stageName], {...action.task, id: generateId()}]
                }
            }
        case constants.CREATE_PROJECT_SUCCESS:
        let {_id, ...rest} = action.payload
            return {
                ...state,
                [_id]: rest
            }
        case constants.MOVE_CARD:
            return {
                ...state,
                [action.payload.projectName]: moveCardUtil(state[action.payload.projectName], action.payload)
            }
       
        default: return state
    }
}

export default projectReducer