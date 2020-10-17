import constants from '../actions/constants'
import generateId from './projectUtils'
const initailState = {
    projectName: 'Project',
    imgUrl:'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
    admin:'',
    members:[],
    noStage: [],
    inProgress: [],
    completed: []
}

const projectReducer = (state = initailState, action) => {
    switch(action.type){
        case constants.ADD_TASK:
            return {
                ...state,
                [action.stageName]: [...state[action.stageName], {...action.task, id: generateId()}]
            }
        default: return state
    }
}

export default projectReducer