import React, { useLayoutEffect, useState } from 'react'
import './AccountDetails.css'
import UserBox from '../UserBox/UserBox'
import NotificationsBill from '../NotificationsBill/NotificationsBill'
import { useDispatch, useSelector } from 'react-redux'
import {logUserOut} from '../../redux/actions/authActions'
import { useHistory } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

export default function AccountDetails() {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 700px)'
      })

    const [isDescktop, setIsDescktop] = useState(null)
    // useLayoutEffect(() => {
    //     let refrence = null
    //     setIsDescktop(document.documentElement.getClientRects()[0].width > 700)
    //     document.documentElement.addEventListener("resize", (e) => {
    //         console.log("event : "+ e);
    //         setIsDescktop(document.documentElement.getClientRects()[0].width > 700)
    //     })
    //     return () => {

    //     }
    // }, [])

    const history = useHistory()
    const handleLogOut = () => {
        dispatch(logUserOut())
        history.push('/landing')

    }
    const user = useSelector(state => state.auth.user)
    const notificationCssClass = user?.invitations?.length ? 'redNotification': ''
    const dispatch = useDispatch()
    console.log('is descktop: ' + isDescktop);
    if(!user) return <h3>loading</h3>
    return (
        <div className='AccountDetails'>
            {isDesktopOrLaptop && <UserBox email={user.email || user.name} imgUrl={user.imgUrl}/> }
            <NotificationsBill className={notificationCssClass} invitations={user.invitations}/>
            <button 
            className='btn pointer' 
            style={{backgroundColor: '#ccc7c7', marginLeft: '10px' }} 
            onClick={handleLogOut}
            >logOUt</button>
        </div>
    )
}
