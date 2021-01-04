const User = require('../../modals/User')
module.exports = async (userId, inviteId) => {

    try {
        const user = await User.findById(userId)
        user.invitations.remove(inviteId)
        await user.save()
    } catch (error) {
        console.log(error);
    }
}