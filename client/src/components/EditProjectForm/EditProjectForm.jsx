import React, {useState} from 'react'
import Modal from '../Modal/Modal'
import { useForm } from 'react-hook-form'
import InputField from '../InputField/InputField'
import {useDispatch, useSelector} from 'react-redux'
import {Card, CardMedia} from '@material-ui/core'
import axios from 'axios'
import {Context} from '../../App'
import { editProject } from '../../redux/actions/project'

export default function EditProjectForm({isOpen, toggleModal, projectId }) {
    const {register, handleSubmit, errors, reset}  = useForm()
    const dispatch = useDispatch()
    const project = useSelector(state => state.project[projectId])
    const user = useSelector(state => state.auth.user)
    const [email, setEmail] = useState(null)
    // const disabled = project?.admin._id !== user._id
    
    
    const onSubmit = data => {
        axios({
            method: 'put',
            headers:{
                Authorization: 'Bearer '  + user.token
            },
            url: '/projects/edit',
            data: {
                _id: projectId,
                ...data
            }
        }).then((res) => {
            toggleModal()
            console.log(res.data);
            dispatch(editProject(res.data))
            reset()
        }).catch(err => console.log(err))
    }
    const handleInvite = () => {
        axios({
            url: '/projects/invite',
            method: 'put',
            headers: {
                Authorization: 'Bearer ' + user.token
            },
            data: {
                projectId: project._id,
                email
            }
        }).then(res =>{
            context.sendInvite(res.data)
        })
        .catch(console.log)
    }

    const context  = React.useContext(Context)
    return (
        <Modal isOpen={isOpen} toggleModal={toggleModal}>
            <div className='CreateProjectForm'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <CardMedia style={{
                            width: 300,
                            height: 300 , 
                            }}
                        image={`${project?.imgUrl}`}/>
                    </Card>
                    <InputField
                        autoComplete="off" 
                        name="projectName" 
                        ref={register({required: true})} 
                        type="text" 
                        defaultValue={project?.projectName}
                    />
                    {errors.title && <div>this field is required</div>}

                    <InputField
                        autoComplete="off" 
                        name="imgUrl" 
                        ref={register()} 
                        type="text" 
                        defaultValue={project?.imgUrl}
                    />
                    {errors.description && <div>this field is required</div>}
                    <input className='btn' type="submit" value="CreateProject"/>
                </form>

                <InputField
                        autoComplete="off" 
                        type="text" 
                        placeholder="enter email to invite ..."
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <button 
                    onClick={handleInvite}>invite</button>

            </div>
        </Modal>
    )
}
  