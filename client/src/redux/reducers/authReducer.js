import constants from '../actions/constants'

const initialState = {
    loading : false,
    user: null
}

const authReducer = (state=initialState, action) => {
    switch(action.type){

        case constants.SET_USER_START:
            return {
                ...state,
                loading: true,
            }
        case constants.SET_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case constants.SET_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        
        default: return state
    }
}

export default authReducer