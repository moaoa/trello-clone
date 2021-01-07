const express = require('express')
const Router = express.Router()
const Project = require('../modals/Project')
const User = require('../modals/User')
const auth = require('../middleware/authMiddleware')
const pullProps = require('../utils/pullProps')
const genId = require('../utils/genId')
const projectProps = ['projectName', 'imgUrl', 'admin', 'noStage', 'inProgress', 'completed', '_id', 'members']
const moveCardUtil = require('../utils/moveCard')
const generateToken = require('../utils/generateToken')
const jwt = require('jsonwebtoken')



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
    const projects = await Project.find({
        $or: [
            {'members': req.user._id},
            {'admin': req.user._id }
        ]
    })
    .populate('members', 'imgUrl name')
    .populate('admin', 'imgUrl')
    
    res.json(projects)
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

Router.put('/invite',auth, async (req, res) => {
    const { email, projectId } = req.body

    if(!email || !projectId) return res.status(400).json({msg: 'something went Wrong'})
    let project , user, sender 
    try {
        sender = await User.findById(req.user)
        user = await User.findOne({email})
        project = await Project.findById(projectId)
        if(!user || !project) return  res.status(400).json({msg: 'something went Wrong'})
        
        if(project.admin.toJSON() === req.user._id) {
            const projectObject = project.toObject();

            // see if the user is already a member of this project
            let memberExists = projectObject.members.find(
                member => member.toJSON() === user._id.toJSON()
                )

            
                // the user is indeed a member of the project so don't send any data to frontend
            if (memberExists) {
                return res.send()
            }


            const invite = generateToken({invitedUserId: user._id, projectId: project._id})
            const inviteObject = {
                senderName: sender.name,
                senderImgUrl: sender.imgUrl,
                projectName: project.projectName,
                inviteToken: invite
                }

            user.invitations.push(inviteObject)
            await user.save()

            res.json({invite: inviteObject, socketId: user.socketId})
        }
        else{
            res.status(400).send()
        }
    } catch (error) {
        console.log(error);
        res.status(500).send()
    }
    
})

Router.put('/accept-invite', async ( req, res ) => {
    const invite = req.body.invite
    try {
        const { invitedUserId, projectId } = jwt.verify(invite.inviteToken, process.env.JWT_SECRET)
        const project = await Project.findById(projectId)
        project.members.push(invitedUserId)
        const user = await User.findById(invitedUserId).select("name imgUrl _id").lean()
        // pull means remove
        user.invitations.pull(invite._id)
        await project.save()
        await user.save()
        res.json({addedMember: user, project: project})
    } catch (error) {
       console.log(error); 
       res.status(500).json({msg: "something went wrong"})
    }
})

Router.put('/decline-invite', auth, async (req, res)=> {
    const inviteId = req.body.invite._id
    if(!inviteId) return res.status(400).send()

    try {
        const user = await User.findById(req.user)
        user.invitations.pull(inviteId)
        await user.save()
        res.send()
    } catch (error) {
        console.log(error);
        res.status(500).send()
    }

})


Router.put('/edit', auth, async (req, res) => {
    let project 
    const {projectName, imgUrl} = req.body
    try {
        project = await Project.findById(req.body._id)
        project.projectName = projectName
        project.imgUrl = imgUrl
        await project.save()
        res.json(project)

    } catch (error) {
        res.status(500).json({msg: 'something went wrong'})
        console.log(error);
    }
})


module.exports = Router
