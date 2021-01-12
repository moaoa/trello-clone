import React from 'react'
import './Sidebar.css'
import SidebarItem from '../SidebarItem/SidebarItem'
import { GrProjects } from 'react-icons/gr'
import { AiOutlineProject } from 'react-icons/ai'


function sidebar() {
    return (
        <div className='Sidebar'>
            <SidebarItem Icon={GrProjects} title={'DASHBOARD'}  />
            <SidebarItem Icon={AiOutlineProject} title={'MY PROJECTS'} />
        </div>
    )
}



export default sidebar

