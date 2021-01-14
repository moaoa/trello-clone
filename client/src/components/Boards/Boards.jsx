import React , { useState } from 'react'
import './Boards.css'
import BoardsHeader from '../BoardsHeader/BoardsHeader'
import {Route} from 'react-router'
import ProjectContainer from '../ProjectContainer/ProjectContainer'
import Dashboard from '../Dashboard/Dashboard'
import MyProjectsPage from '../../Pages/MyProjectsPage/MyProjects'
import EditProjectFrom from '../EditProjectForm/EditProjectForm'




export default function Boards() {

    const [formData, setFormData] = useState({isOpen: false, projectId: null})
    const openModal = (id) => setFormData(() => ({ projectId: id, isOpen: true }))
    const closeModal = () => setFormData(() => ({ isOpen: false, projectId: null }))

    return (
        <div className='boards'>
            <BoardsHeader/>
            <EditProjectFrom 
                isOpen={formData.isOpen} 
                toggleModal={closeModal}
                projectId={formData.projectId}
            />
            <Route path={`/dashboard`} render={(props) => <Dashboard {...props} openEditModal={openModal} />} />
            <Route path='/my-projects' render={(props) => <MyProjectsPage {...props} openEditModal={openModal} />} />
            <Route path='/project/:id' component={ProjectContainer}/>
            {/* <Route path= {`/profile`}  render={() => <div>profile page</div>} /> */}
        </div>
    )
}


