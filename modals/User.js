const mongoose = require('mongoose')


const { Schema } = mongoose

const UserSchema  = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    imgUrl: String,
    socketId: String,
    invitations: [{senderName: String, senderImgUrl: String, projectName: String}]
})

module.exports = mongoose.model('User', UserSchema)

