const User = require('../../modals/User')

module.exports =async (email, imgUrl) => {
    try {
        const user = await User.findOne({email})
        user.imgUrl = imgUrl
        await user.save()
    } catch (error) {
        console.log(error);
    }
}