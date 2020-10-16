import constants from '../actions/constants'
import generateId from './projectUtils'
// const initailState = {
//     noStage: [
//             {id: generateId(), title: 'task 1', description: 'description'},
//             {id: generateId(), title: 'task 1', description: 'description'}
//     ],
//     inProgress:  [
//             {id: generateId(), title: 'task 1', description: 'description'},
//             {id: generateId(), title: 'task 1', description: 'description'}
//     ],
//     completed: [
//             {id: generateId(), title: 'task 1', description: 'description'},
//             {id: generateId(), title: 'task 1', description: 'description'}
//     ],
// }
const initailState = {
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