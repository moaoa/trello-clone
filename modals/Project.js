const mongoose = require('mongoose')


const { Schema } = mongoose

const projectSchema  = new Schema({
    projectName: {
    type: String, 
    required: true,
    },
    imgUrl: String,
    admin: {type: mongoose.Types.ObjectId, ref: 'User'},
    noStage: [{title: String, description: String}],
    inProgress: [{title: String, description: String}],
    completed: [{title: String, description: String}],
})

module.exports = mongoose.model('Project', projectSchema)