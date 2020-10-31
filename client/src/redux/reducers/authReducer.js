import constants from '../actions/constants'

const initialState = {
    loading : false,
    user: null
}

const authReducer = (state=initialState, action) => {
    switch(action.type){

        case constants.SIGN_IN_USER_START:
            return {
                ...state,
                loading: true,
            }
        case constants.SIGN_IN_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case constants.SIGN_IN_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case constants.SIGN_UP_USER_START:
            return {
                ...state,
                loading: true,
            }
        case constants.SIGN_UP_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case constants.SIGN_UP_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case constants.LOG_USER_OUT:
            return initialState
        
        default: return state
    }
}

export default authReducer