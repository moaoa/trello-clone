export default function genId(){
    return  Math.floor(Math.random() * 10000) 
}



export const moveCardUtil = (project, payload) => {
    const {dragStage,dropStage, dragIndex, hoverIndex } = payload
    const dragedTask = project[dragStage][dragIndex]
    const dropedOnTask = project[dropStage][hoverIndex]

    if(dragStage === dropStage) {
        // make new copy of the drag Stage *** since the slice method is an immutable method
        const dragStageArr = project[dragStage].slice()
        dragStageArr[dragIndex] = dropedOnTask
        dragStageArr[hoverIndex] = dragedTask
        return {
            ...project,
            [dragStage] : dragStageArr
        }
    }
    // make new copy
    const dropStageArr = project[dropStage].slice()

    dropStageArr.splice(hoverIndex, 0, dragedTask)

    return {
        ...project,
        [dragStage]: project[dragStage].filter((task, index) => index !== dragIndex),
        [dropStage]: dropStageArr
    }
}
