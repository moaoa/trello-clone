const mongoose = require('mongoose')


const { Schema } = mongoose


const UserSchema  = new Schema({
    _id: String,
    imgUrl: String,
    name: String
})
// UserSchema.methods.toJsObject = async () => {
//     return await mongoose.model('GoogleUser').findById(this._id).lean()
// }

module.exports = mongoose.model('GoogleUser', UserSchema)