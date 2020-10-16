import React from 'react'
import './Header.css'
import {AiOutlinePlus} from 'react-icons/ai'

export default function Header() {
    return (
        <div className='sidebar__header'>
            <h2>Teams</h2>
            <button className='cyrcle_button pointer'><AiOutlinePlus className='plus-icon'/></button>
        </div>
    )
}
