import React from 'react'
import './CreateTaskForm.css'
import Modal from '../Modal/Modal'
import { useForm } from 'react-hook-form'
import InputField from '../InputField/InputField'
import { addTask } from '../../redux/actions/project'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'


export default function CreateTaskForm({operation,  toggleModal, isOpen}) {
    const {register, handleSubmit, errors, reset}  = useForm()
    const dispatch = useDispatch()
    const {id} = useParams()
    
    const onSubmit = data => {
        toggleModal()
        dispatch(addTask(id, operation, data))
        reset()
    }
    return (
        <Modal toggleModal={toggleModal} isOpen={isOpen}>
            <div className='CreateTaskForm'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField 
                        name="title" 
                        ref={register({required: true})} 
                        type="text"
                        placeholder='title'
                    />
                    {errors.title && <div>this field is required</div>}
                    <InputField 
                        name="description" 
                        ref={register({required: true})} 
                        type="text" 
                        placeholder='description'
                    />
                    {errors.description && <div>this field is required</div>}
                    <input 
                        className='btn' 
                        type="submit" 
                        value="submit"
                    />
                </form>
            </div>
        </Modal>
    )
}
