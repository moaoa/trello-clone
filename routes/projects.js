const express = require('express')
const Router = express.Router()
const Project = require('../modals/Project')
const auth = require('../middleware/authMiddleware')
const pullProps = require('../utils/pullProps')
const projectProps = ['projectName', 'imgUrl', 'admin', 'noStage', 'inProgress', 'completed', '_id']
const authMiddleware = require('../middleware/authMiddleware')

Router.post('/',auth,  async (req, res ) => {
    const {projectName, imgUrl} = req.body
    if(!projectName) return res.status(400).json({msg: 'all fields required'})
    try{
        const newProject = new Project({
            admin: req.user._id,
            projectName: req.body.projectName,
            imgUrl 
        })
        await newProject.save()
        res.status(201).json({project: pullProps(newProject, projectProps)})
    }catch (e) {
        console.log(e);
        res.status(500).send()
    }
})
Router.get('/', authMiddleware, async (req, res) => {
    try {
        const projects =  await  Project.find({admin: req.user._id})
        console.log(projects);
        res.json({projects})
    } catch (error) {
        console.log(error);
    }
})


module.exports = Router
