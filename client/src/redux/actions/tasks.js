import constants from './constants'

export const addTask = (stageName, task) => ({type: constants.ADD_TASK, stageName, task})