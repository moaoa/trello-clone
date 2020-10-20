const defaultImg = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
export default function genId(){
    return  Math.floor(Math.random() * 10000) 
}

export const createProjectUtil = (payload) => {
    let project = {} 
    project = {...payload}
    
    //if there is no img url
    if(!payload.imgUrl) project.imgUrl= defaultImg
    project.noStage = []
    project.inProgress = []
    project.completed = []
    project.admin = ''
    project.members = []
    return project
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

export const moveCardToEmptyCardUtil = (project, payload) => {
    const {dragedFrom, dropStage, dragIndex} = payload

    return {
        ...project,
        [dropStage]: [ project[dragedFrom][dragIndex] ],
        [dragedFrom]: project[dragedFrom].filter((task, i) => i !== dragIndex )
    }
}