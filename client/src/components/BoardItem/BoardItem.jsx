import React from 'react'
import './BoardItem.css'

const BoardItem = ({title, description}) => {
    return (
        <div className='BoardItem cardShadow'>
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
    )
}

export default BoardItem