import React, {useState} from 'react'
import './SidebarItem.css'
import Modal from '../Modal/Modal'
import CreateProjectFrom from '../CreateProjectForm/CreateProjectForm'
import {NavLink} from 'react-router-dom'


export default function SidebarItem({Icon, title}) {
    // const [isOpen, setIsOpen] = useState(false)
    // const toggleModal = () => setIsOpen(state => !state)
    // <CreateProjectFrom isOpen={isOpen} toggleModal={ toggleModal } />     
    return (
    <NavLink to={`/${title.toLowerCase().replace(' ', '-')}`} activeClassName='active-link' >
        <div className='sidebar__Dashboard'>
                <Icon className='menu-item-icon'/>
                <h2>{title}</h2>
        </div>
    </NavLink>
    )
}
