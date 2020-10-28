import React from 'react'
import './UserBox.css'
import {AiOutlineUser} from 'react-icons/ai'
import {Link} from 'react-router-dom'

export default function UserBox({email, imgUrl}) {
    let userAvatar = <AiOutlineUser/>
    if(imgUrl) userAvatar = <img src={imgUrl} alt="usr Image"/>
    return (
        <Link to='/'>
            <div className='UserBox cardShadow'>
                {userAvatar}
                <span>{email}</span>
            </div>
        </Link>
    )
}
