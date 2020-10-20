import constants from './constants'

export const addTask = (projectId, stageName, task) => ({type: constants.ADD_TASK, stageName, task, projectId})
export const createProject = (payload) => ({type: constants.CREATE_PROJECT, payload})
export const moveCard = (payload) => ({type: constants.MOVE_CARD, payload})
export const moveCardToEmptyStage = (payload) => ({type: constants.MOVE_CARD_TO_EMPTY_STAGE, payload})