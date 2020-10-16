import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'

export default function Modal({children, isOpen}) {
    return ReactDOM.createPortal(
        <div className={`Modal ${isOpen? 'isOpen': ''}`}>
            {children}
        </div>,
        document.querySelector('#modal')
    )
}
