import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {logUserOut} from '../../redux/actions/authActions'


export default function LogOutButton() {

    const history = useHistory()
    const dispatch = useDispatch()
    
    const handleLogOut = () => {
        dispatch(logUserOut())
        history.push('/landing')

    }

    return (   
    <button 
        className='btn pointer' 
        style={{backgroundColor: '#ccc7c7', marginLeft: '10px' }} 
        onClick={handleLogOut}
    >
        logOut
    </button>
    )
}
