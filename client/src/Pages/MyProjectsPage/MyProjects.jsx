import axios from 'axios'
import React, {useEffect} from 'react'
import './MyProjects.css'
import { useSelector } from 'react-redux'
import ProjectCard from '../../components/TeamCard/TeamCard'

export default function MyProjects() {

    const token = useSelector(state => state.auth.user.token)
    const [myProjects, setMyProjects] = React.useState([])

    useEffect(() => {
        axios({
            method: 'get',
            authorization: 'Bearer ' + token ,
            url: '/projects/my-projects'
        })
        .then(response => {
            console.log(response.data.teams);
            setMyProjects(response.data.teams)
        })
    }, [])
    return (
        <div className='myProjectsPage'>
            {
                myProjects.map((project, i) => <ProjectCard key={`${i}-${Date.now()}`} {...project}/>)
            }            
        </div>
    )
}
