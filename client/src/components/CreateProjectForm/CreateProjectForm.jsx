import React, {useState} from 'react'
import './CreateProjectForm.css'
import Modal from '../Modal/Modal'
import { useForm } from 'react-hook-form'
import InputField from '../InputField/InputField'
import {useDispatch} from 'react-redux'
import {createProject} from '../../redux/actions/project'

export default function CreateProjectForm({isOpen, toggleModal}) {
    const {register, handleSubmit, errors, reset}  = useForm()
    const dispatch = useDispatch()
    const onSubmit = data => {
        toggleModal()
        dispatch(createProject(data))
        reset()
    }
    return (
        <Modal isOpen={isOpen} toggleModal={toggleModal}>
            <div className='CreateProjectForm'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField 
                        name="projectName" 
                        ref={register({required: true})} 
                        type="text" 
                        placeholder='projectName'
                    />
                    {errors.title && <div>this field is required</div>}
                    <InputField 
                        name="imgUrl" 
                        ref={register()} 
                        type="text" 
                        placeholder='Enter image Url'
                    />
                    {errors.description && <div>this field is required</div>}
                    <input className='btn' type="submit" value="CreateProject"/>
                </form>
            </div>
        </Modal>
    )
}
  