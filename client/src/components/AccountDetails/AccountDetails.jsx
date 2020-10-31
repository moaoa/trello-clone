import React from 'react'
import './AccountDetails.css'
import UserBox from '../UserBox/UserBox'
import NotificationsBill from '../NotificationsBill/NotificationsBill'
import { useDispatch, useSelector } from 'react-redux'
import {logUserOut} from '../../redux/actions/authActions'

export default function AccountDetails() {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    return (
        <div className='AccountDetails'>
            <UserBox email={user.email || user.name} imgUrl={user.imgUrl}/>
            <NotificationsBill/>
            <button className='btn pointer' style={{backgroundColor: '#ccc7c7', marginLeft: '10px' }} onClick={() => dispatch(logUserOut())}>logOUt</button>
        </div>
    )
}
