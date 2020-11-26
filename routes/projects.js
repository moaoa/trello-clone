const express = require('express')
const Router = express.Router()
const Project = require('../modals/Project')
const auth = require('../middleware/authMiddleware')
const pullProps = require('../utils/pullProps')
const genId = require('../utils/genId')
const projectProps = ['projectName', 'imgUrl', 'admin', 'noStage', 'inProgress', 'completed', '_id', 'members']
const moveCardUtil = require('../utils/moveCard')
const onlineUsers = require('../server')


const dummyDate = {
    projects: [
        {
            _id: 'adfadfdfasdfffdfdfff',
            projectName: 'project1',
            noStage: [{title: 'task1', description: 'description', id:'1234567543'},{title: 'task2', description: 'description', id:'234234234'} ],
            inProgress: [],
            completed:[],
            members: [
                {   
                    name: 'moaad',
                    imgUrl: 'https://images.unsplash.com/photo-1549913772-820279f909b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                },
                    
                {
                name: 'member 2',
                imgUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                }
            ]
        },
        {
            _id: 'ereqerdadfdaf',
            projectName: 'project2',
            noStage:[],
            inProgress: [],
            completed:[],
            imgUrl: 'https://images.unsplash.com/photo-1602524816765-67313fa3ef54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            members: [
                {  
                    name: 'moaad',
                    imgUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                },
                {
                    name: 'member 2',
                    imgUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                }
            ]
        }
    ]
}

Router.post('/', auth,  async (req, res ) => {
    const {projectName, imgUrl} = req.body
    if(!projectName) return res.status(400).json({msg: 'project name is required'})
    try{
        const newProject = new Project({
            admin: req.user._id,
            projectName: projectName,
            imgUrl 
        })
        await newProject.save()
        res.status(201).json({project: pullProps(newProject, projectProps)})
    }catch (e) {
        console.log(e);
        res.status(500).send()
    }
})

Router.post('/task', auth, async (req, res) => {
    try {
        const {projectId, stageName, task}  = req.body
        const project = await Project.findById(projectId)
        project[stageName] = [...project[stageName], {...task, id: genId()}]
         await project.save()
        res.status(200).send()
    } catch (error) {
        console.log(error);
        res.status(500).send()
    }
})
Router.get('/dashboard', auth, async (req, res) => {
    // filter the projects
    const projects = await Project.find()
    res.json(projects)
})

// +++++++++++++++++++++++ check this one
Router.get('/', auth, async (req, res) => {
    try {
        const projects =  await  Project.find({admin: req.user._id})
        res.json({projects})
    } catch (error) {
        console.log(error);
    }
})

Router.get('/my-projects', auth ,  async (req, res) => {
    // fetch from db
    const projects = await Project.find({admin: req.user})
    
    res.json(projects)
})

Router.put('/', auth , async (req, res) => {
    try {
        let  project = await  Project.findById(req.body.projectId)    
        let modefiedProject = moveCardUtil(pullProps(project, projectProps), req.body)

        await project.updateOne(modefiedProject)
        res.status(200).send()
    } catch (error) {
        console.log(error);
    }
    res.status(200).send()
})

Router.put('/invite', (req, res) => {
    onlineUsers
})


module.exports = Router
