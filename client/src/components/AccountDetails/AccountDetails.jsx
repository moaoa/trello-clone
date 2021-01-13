import React from 'react'
import './AccountDetails.css'
import UserBox from '../UserBox/UserBox'
import NotificationsBill from '../NotificationsBill/NotificationsBill'
import {  useSelector } from 'react-redux'
import LogOutButton from '../LogOutButton/LogOutButton'

export default function AccountDetails() {

 
    const user = useSelector(state => state.auth.user)
    const notificationCssClass = user?.invitations?.length ? 'redNotification': ''
    if(!user) return <h3>loading</h3>
    return (
        <div className='AccountDetails'>
            <UserBox email={user.email || user.name} imgUrl={user.imgUrl}/> 
            <NotificationsBill className={notificationCssClass} invitations={user.invitations}/>
            <LogOutButton />
        </div>
    )
}
