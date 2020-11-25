import React , {useState, useEffect, useRef} from 'react'
import Calendar from 'react-calendar'
import {AiOutlinePlus} from 'react-icons/ai'
import 'react-calendar/dist/Calendar.css';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import ProjectCard from '../ProjectCard/ProjectCard'
import { setProjects } from '../../redux/actions/project'
import {IconButton} from '@material-ui/core'
import CreateProjectFrom from '../CreateProjectForm/CreateProjectForm'
import EditProjectFrom from '../EditProjectForm/EditProjectForm'
import './Dashboard.css'


export default function Dashboard() {
    const [calendarDate, setCalendarDate] = useState(new Date())
    const user = useSelector(state => state.auth.user)
    const projects = useSelector(state => state.project)
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] =  useState(false)
    const toggleModel = ()=> setIsOpen(state => !state)
    const [formData, setFormData] = useState({isOpen: false, projectId: null})
    const openModal = (id) => setFormData(state => ({ projectId: id, isOpen: true }))
    const closeModal = () => setFormData(state => ({ isOpen: false, projectId: null }))
    
    useEffect(() => {
        axios({
            method: 'GET',
            headers: {
                authorization: "Bearer " + user.token
            },
            url: '/projects/dashboard'
        })
        .then(response => {
            console.log('projects form frontend: ', response.data);
            dispatch(
                setProjects(response.data)
            )
        })
        .catch(console.log)
    }, [])

    


    return (
        <div className='dashboard'>
            <CreateProjectFrom isOpen={isOpen} toggleModal={toggleModel} />
            <EditProjectFrom 
                isOpen={formData.isOpen} 
                toggleModal={closeModal}
                projectId={formData.projectId}
            />
            <IconButton 
                onClick={toggleModel}>
                <AiOutlinePlus 
                    className='pointer'
                    style={{fontSize : 24}}
                />
            </IconButton>
            <div className='dashboard__projects'>
                {
                    Object.values(projects)?.map(project => <ProjectCard key={project._id} {...project} openModal={openModal} />)
                }
            </div>
            <div>
                <Calendar value={calendarDate} onChange={setCalendarDate}/>
            </div>
        </div>
    )
}