import React , {useState, useEffect} from 'react'
import Calendar from 'react-calendar'
import {AiOutlinePlus} from 'react-icons/ai'
import 'react-calendar/dist/Calendar.css';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import ProjectCard from '../ProjectCard/ProjectCard'
import { setProjects } from '../../redux/actions/project'
import {IconButton} from '@material-ui/core'
import CreateProjectFrom from '../CreateProjectForm/CreateProjectForm'
import {logUserOut} from '../../redux/actions/authActions'
import './Dashboard.css'


export default function Dashboard({ openEditModal }) {
    const [calendarDate, setCalendarDate] = useState(new Date())
    const user = useSelector(state => state.auth.user)
    const projects = useSelector(state => state.project)
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] =  useState(false)
    const toggleModel = ()=> setIsOpen(state => !state)
    
    useEffect(() => {
        if(user) {
                axios({
                    method: 'GET',
                    headers: {
                        authorization: "Bearer " + user.token
                    },
                    url: '/projects/dashboard'
                })
                .then(response => {
                    dispatch(
                        setProjects(response.data)
                    )
                })
                .catch(e => {
                    console.log(e);
                    
                    if(e.message === 'Request failed with status code 400') dispatch(logUserOut())
                })
            }
    }, [])


    return (
        <div className='dashboard'>
            <CreateProjectFrom isOpen={isOpen} toggleModal={toggleModel} />
            
            <IconButton 
                onClick={toggleModel}>
                <AiOutlinePlus 
                    className='pointer'
                    style={{fontSize : 24}}
                />
            </IconButton>
            <div className='dashboard__projects'>
                {
                    Object.values(projects)?.map(project => <ProjectCard key={project._id} {...project} openModal={openEditModal} />)
                }
            </div>
            <div>
                <Calendar value={calendarDate} onChange={setCalendarDate}/>
            </div>
        </div>
    )
}
