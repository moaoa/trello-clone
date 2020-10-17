import {createStore, applyMiddleware, combineReducers} from 'redux'

import authReducer from './reducers/authReducer'
import projectsReducer from './reducers/projectReducer'
import logger from 'redux-logger'

const rootReducer = createStore(combineReducers({
    auth: authReducer,
    project: projectsReducer
}),
applyMiddleware(logger))

export default  rootReducer