const express = require('express')
const Router = express.Router()
const cors = require('cors')
const Project = require('../modals/Project')

Router.post('/', async (req, res ) => {
    console.log(req.body);
    try{
        const newProject = new Project({
            projectName: req.body.projectName,
            
        })
        await newProject.save()
        res.status(201).send()
    }catch (e) {
        console.log(e);
        res.status(500).send()
    }
})


module.exports = Router
