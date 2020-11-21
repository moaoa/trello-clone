import React from 'react'
import './Boards.css'
import BoardsHeader from '../BoardsHeader/BoardsHeader'
import {Route} from 'react-router'
import ProjectContainer from '../ProjectContainer/ProjectContainer'
import Dashboard from '../Dashboard/Dashboard'
import MyProjectsPage from '../../Pages/MyProjectsPage/MyProjects'



export default function Boards() {
    return (
        <div className='boards'>
            <BoardsHeader/>
            <Route path={`/dashboard`} component={Dashboard} />
            <Route path='/my-projects' component={MyProjectsPage}/>
            {/* <Route path= {`/profile`}  render={() => <div>profile page</div>} /> */}
            <Route path='/project/:id' component={ProjectContainer}/>
        </div>
    )
}


