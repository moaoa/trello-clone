import constants from './constants'
import axios from 'axios'
import { toast } from 'react-toastify';

export const signInUserStart = () => ({type: constants.SIGN_IN_USER_START})
export const signInUserSuccess = (payload) => ({type: constants.SIGN_IN_USER_SUCCESS, payload})
export const signInUserFailure = (payload) => ({type: constants.SIGN_IN_USER_FAILURE, payload})
export const signInUserAsync  = (data) => {
    return async (dispatch) => {
        dispatch(signInUserStart())
        try {
            const res = await axios.post('/auth/signin', data)
            if(res.status === 200) dispatch(signInUserSuccess(res.data.user))
        } catch (e) {
            console.log(e);
            dispatch(signInUserFailure())
            toast.error('some thing went wrong')
        }
    }
}
export const signUpUserStart = () => ({type: constants.SIGN_UP_USER_START})
export const signUpUserSuccess = (payload) => ({type: constants.SIGN_UP_USER_SUCCESS, payload})
export const signUpUserFailure = (payload) => ({type: constants.SIGN_UP_USER_FAILURE, payload})
export const signUpUserAsync  = (data) => {
    return async (dispatch) => {
        dispatch(signUpUserStart())
        try {
            const res = await axios.post('/auth/signup', data)
            if(res.status === 201) dispatch(signUpUserSuccess(res.data.user))
        } catch (e) {
            console.log(e);
            dispatch(signUpUserFailure(e))
            toast.error('some thing went wrong')
        }
    }
}
export const signInUserWithGoogle =  (token) => {
    return async (dispatch) => {
    try {
        const { data } = await axios.get('/auth/user', {
            headers:{
                authorization: "Bearer " +  token
            }
        })
        
        dispatch(signInUserSuccess(data.user))
    } catch (error) {
        console.log(error);
        toast.error('something went wrong')
    }
}
}

export const logUserOut = () => ({type: constants.LOG_USER_OUT})

