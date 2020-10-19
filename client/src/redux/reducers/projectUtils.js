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

