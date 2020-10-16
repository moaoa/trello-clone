import React from 'react'
import './AccountDetails.css'
import UserBox from '../UserBox/UserBox'
import NotificationsBill from '../NotificationsBill/NotificationsBill'
import userImg from '../../assets/pexels-pixabay-40904.jpg'

export default function AccountDetails() {
    return (
        <div className='AccountDetails'>
            <UserBox email='moaad@gmail.com' imgUrl={userImg}/>
            <NotificationsBill/>
        </div>
    )
}
