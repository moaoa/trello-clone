import constants from './constants'

export const addTask = (projectId, stageName, task) => ({type: constants.ADD_TASK, stageName, task, projectId})
export const createProject = (payload) => ({type: constants.CREATE_PROJECT, payload})