import React from 'react'
import './BoardItem.css'
import {useDrag, useDrop} from 'react-dnd'
import {ItemTypes} from '../../dragAndDropUtils/utils'
import { useRef } from 'react'

const BoardItem = ({title, description, id}) => {
    const [ {isDragging}, dragRef ] = useDrag({
        item: {type: ItemTypes.CARD , id},
        collect: monitor => ({isDragging: monitor.isDragging()})

    })
    const [{isOver}, drop]  = useDrop({
        accept: ItemTypes.CARD,
        drop: (item, monitor) => console.log(item),
        collect: (monitor) => monitor.isOver()
    })

    const ref = useRef(null)  
    dragRef(drop(ref))
    return (
        <div className='BoardItem cardShadow' ref={ref}>
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
    )
}

export default BoardItem