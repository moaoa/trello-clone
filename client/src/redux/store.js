import {createStore, applyMiddleware, combineReducers} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from './reducers/authReducer'
import projectsReducer from './reducers/projectReducer'
import logger from 'redux-logger'

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectsReducer
})



const persistConfig = {
    key:'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)



export let store = createStore(persistedReducer, applyMiddleware(logger)) 

export let persistor = persistStore(store)
