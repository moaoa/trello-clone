const mongoose = require('mongoose')


const { Schema } = mongoose

const projectSchema  = new Schema({
    projectName: {
    type: String, 
    required: true,
    },
    imgUrl: String,
    admin: {type: mongoose.Types.ObjectId, ref: 'User' },
    noStage: [{title: String, description: String}],
    inProgress: [{title: String, description: String}],
    completed: [{title: String, description: String}],
    members: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    
})

projectSchema.pre('save', function() {
    if(!this.imgUrl) {
        this.imgUrl = 'https://image.flaticon.com/icons/png/512/85/85966.png'
    }
})

module.exports = mongoose.model('Project', projectSchema)