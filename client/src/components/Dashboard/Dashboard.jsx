import React , {useState, useEffect} from 'react'
import Calendar from 'react-calendar'
import {AiOutlinePlus} from 'react-icons/ai'
import 'react-calendar/dist/Calendar.css';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import TeamCard from '../TeamCard/TeamCard'
import { setProjects } from '../../redux/actions/project'
import {IconButton} from '@material-ui/core'
import CreateProjectFrom from '../CreateProjectForm/CreateProjectForm'
import './Dashboard.css'


export default function Dashboard() {
    const [calendarDate, setCalendarDate] = useState(new Date())
    const user = useSelector(state => state.auth.user)
    const projects = useSelector(state => state.project)
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] =  useState(false)
    const toggleModel = ()=> setIsOpen(state => !state)
    
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
            <IconButton onClick={toggleModel}><AiOutlinePlus className='pointer'  style={{fontSize : 24}}/></IconButton>
            <div className='teams'>
                {
                    Object.values(projects)?.map(project => <TeamCard key={project._id} {...project} />)
                }
            </div>
            <div>
                <Calendar value={calendarDate} onChange={setCalendarDate}/>
            </div>
        </div>
    )
}
