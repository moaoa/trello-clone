import React from 'react'
import './UserBox.css'
import {AiOutlineUser} from 'react-icons/ai'

export default function UserBox({email, imgUrl}) {
    let userAvatar = <AiOutlineUser/>
    if(imgUrl) userAvatar = <img src={imgUrl} alt="usr Image"/>
    return (
        <div className='UserBox'>
            {userAvatar}
            <span>{email}</span>
            
        </div>
    )
}
