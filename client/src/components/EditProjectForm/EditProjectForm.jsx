import React from 'react'
import Modal from '../Modal/Modal'
import { useForm } from 'react-hook-form'
import InputField from '../InputField/InputField'
import {useDispatch, useSelector} from 'react-redux'
import {createProjectAsync} from '../../redux/actions/project'
import {Card, CardMedia} from '@material-ui/core'

export default function EditProjectForm({isOpen, toggleModal, projectId }) {
    const {register, handleSubmit, errors, reset}  = useForm()
    const dispatch = useDispatch()
    const project = useSelector(state => state.project[projectId])
    
    const onSubmit = data => {
        toggleModal()
        // dispatch(createProjectAsync(data))
        reset()
    }
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
            </div>
        </Modal>
    )
}
  