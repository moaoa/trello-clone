import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './MyProjects.css'
import { useSelector } from 'react-redux'
import ProjectCard from '../../components/ProjectCard/ProjectCard'

export default function MyProjects({ openEditModal }) {
    const user = useSelector(state => state.auth.user)
    const [loading, setLoading] =  useState(true)
    const [myProjects, setMyProjects] = React.useState([])

    let token = user.token

    useEffect(() => {
        if(user)
        axios({
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + token
            },
            url: '/projects/my-projects'
        })
        .then(response => {
            setMyProjects(response.data)
        })
        .finally(() => setLoading(false))
    }, [])

    if(loading) return <div>loading</div>
    return (
        <div className='myProjectsPage'>
            {
               myProjects.length ?  myProjects.map((project, i) => <ProjectCard openModal={openEditModal} key={`${i}-${Date.now()}`} {...project}/>): <h3>no projects</h3>
            }            
        </div>
    )
}
