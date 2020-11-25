import axios from 'axios'
import React, {useEffect, useState} from 'react'
import './MyProjects.css'
import { useSelector } from 'react-redux'
import ProjectCard from '../../components/ProjectCard/ProjectCard'

export default function MyProjects() {
    const [loading, setLoading] =  useState(true)

    const token = useSelector(state => state.auth.user.token)
    console.log(token);

    const [myProjects, setMyProjects] = React.useState([])

    useEffect(() => {
        axios({
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + token
            },
            url: '/projects/my-projects'
        })
        .then(response => {
            
            console.log(response.data);
            setMyProjects(response.data)
        })
        .finally(() => setLoading(false))
    }, [])

    if(loading) return <div>loading</div>
    return (
        <div className='myProjectsPage'>

            {
               myProjects.length ?  myProjects.map((project, i) => <ProjectCard key={`${i}-${Date.now()}`} {...project}/>): <h3>no projects</h3>
            }            
        </div>
    )
}
