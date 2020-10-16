import {createStore, applyMiddleware, combineReducers} from 'redux'

import authReducer from './reducers/authReducer'
import teamsReducer from './reducers//teamsReducer'
import projectsReducer from './reducers/projectReducer'
import logger from 'redux-logger'

const rootReducer = createStore(combineReducers({
    auth: authReducer,
    teams: teamsReducer,
    project: projectsReducer
}),
applyMiddleware(logger))

export default  rootReducer