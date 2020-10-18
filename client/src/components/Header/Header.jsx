import React, {useState} from 'react'
import './Header.css'
import {AiOutlinePlus} from 'react-icons/ai'
import Modal from '../Modal/Modal'
import CreateProjectFrom from '../CreateProjectForm/CreateProjectForm'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const toggleModal = () => setIsOpen(state => !state)
    return (
        <div className='sidebar__header'>
            <CreateProjectFrom isOpen={isOpen} toggleModal={ toggleModal } />     
            <h2>Projects</h2>
            <button
                 className='cyrcle_button pointer'
                 onClick={toggleModal}
                 >
                <AiOutlinePlus className='plus-icon'/>
            </button>
        </div>
    )
}
