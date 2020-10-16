import React from 'react'
import './Boards.css'
import BoardsHeader from '../BoardsHeader/BoardsHeader'
import {Route} from 'react-router'
import ProjectContainer from '../ProjectContainer/ProjectContainer'




export default function Boards() {
    return (
        <div className='boards'>
            <BoardsHeader/>
            <Route path='/' exact render={() => <div>profile page</div>} />
            <Route path='/project/:id' component={ProjectContainer}/>
        </div>
    )
}


