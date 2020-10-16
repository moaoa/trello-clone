import constants from '../actions/constants'
const initailState = [
    {
        teamName: 'google',
        projectName: 'google Project',
        members: ['user1Id'],
        projectId: 'projectId'
    },
    {teamName: 'apple', projectName: 'apple Project', members: ['user1Id']}
]

const teamsReducer = (state=initailState, action) => {
    switch(action.type){
        default: return state
    }
}

export default teamsReducer