import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'

export default function Modal({children, isOpen, toggleModal}) {
    return ReactDOM.createPortal(
        <>
            <div className={`Modal ${isOpen? 'isOpen': ''}`}>
                {children}
            </div>
            <div className={`overlay ${isOpen? 'show': ''}`}  onClick={toggleModal}>

            </div>
        </>,
        document.querySelector('#modal')
    )
}
