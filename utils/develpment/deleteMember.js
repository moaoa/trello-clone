const Project = require('../../modals/Project')

module.exports = async (projectId) => {
    try {
        const project = await Project.findById(projectId)
        project.members.pop()
        await project.save()
    } catch (error) {
        console.log(error);
    }
}