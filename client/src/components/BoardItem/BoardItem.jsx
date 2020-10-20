import React, { useRef } from 'react'
import './BoardItem.css'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from '../../dragAndDropUtils/utils'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { moveCard } from '../../redux/actions/project'


const BoardItem = ({title, description, id, index, stage}) => {
    const dispatch = useDispatch()
    const params = useParams()
    const [ {isDragging}, dragRef ] = useDrag({
        item: {type: ItemTypes.CARD , id, index, dragStage: stage},
        collect: monitor => ({isDragging: monitor.isDragging()})

    })
    const [{isOver}, drop]  = useDrop({
        accept: ItemTypes.CARD,
        drop: (item, monitor) => {
            if(!ref.current ) return 
            const dragIndex = item.index
            const hoverIndex = index
            const hoverBoundingRect = ref.current.getBoundingClientRect()
            const hoverMiddleY = ( hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const mouseOffset = monitor.getClientOffset()
            const hoverClientY = mouseOffset.y - hoverBoundingRect.top

            if(dragIndex === hoverIndex && item.dragStage === stage) return 
            if(dragIndex < hoverIndex && hoverClientY < hoverMiddleY)  return 
            if(dragIndex > hoverIndex && hoverClientY >  hoverMiddleY) return 

            // redux action 
            dispatch(
                moveCard( {
                     dragIndex,
                     hoverIndex,
                     projectName: params.id,
                     dropStage: stage,
                     dragStage: item.dragStage
                 }))

        },
        collect: (monitor) => monitor.isOver(),
        
    })

    const ref = useRef(null)  
    drop(dragRef(ref))
    return (
        <div className='BoardItem cardShadow' ref={ref}>
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
    )
}

export default BoardItem