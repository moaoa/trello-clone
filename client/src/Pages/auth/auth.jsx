import React, {useState} from 'react';
import './auth.css'
import InputField from '../../components/InputField/InputField'
import { useForm } from 'react-hook-form'
import {useDispatch} from 'react-redux'
import {signInUserAsync, signUpUserAsync} from '../../redux/actions/authActions'
import { useHistory } from 'react-router-dom'

export default function InputAdornments() {
    const dispatch = useDispatch()
    const [isSignUp, setIsSignUp] = useState(true)
    const {register, handleSubmit, errors, reset, getValues}  = useForm()
    const history = useHistory()

    const  onSubmit = async data => {
        if(isSignUp) {
            dispatch(signUpUserAsync(data))
        }else{
            dispatch(signInUserAsync(data))
       }
       reset()
    //    history.push('/dashboard')
    }
    const toggle = () => setIsSignUp(state => !state)

    return (
        <div className='auth'>
            <div className='auth-form'>
                {isSignUp ? <h3>Sign Up</h3> : <h3>Sign In</h3>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    {isSignUp && <InputField 
                     autoComplete="off" 
                     name="name" 
                     ref={register({required: true})} 
                     type="text"
                     placeholder='Enter your Name'
                    /> }
                    <InputField
                        autoComplete="off" 
                        name="email" 
                        ref={register({required: true})} 
                        type="text"
                        placeholder='Enter Email'
                    />
                    {errors.email && <div>this field is required</div>}
                    <InputField
                        autoComplete="off" 
                        name="password" 
                        ref={register({required: true})} 
                        type="text" 
                        placeholder='password'
                    />
                    {errors.password && <div>this field is required</div>}
                    {isSignUp && (
                        <>
                            <InputField
                                autoComplete='off'
                                name="passwordConfirmation"
                                placeholder='confirm password'
                                ref={register({
                                    required:true,
                                    validate :{
                                        match: value => {
                                            const {password} = getValues()
                                            return value === password || "confirm password!"
                                        }
                                    }
                                })}
                            />
                            {errors.passwordConfirmation && errors.passwordConfirmation.message}
                        </>
                    )}
                        <input 
                        className='btn' 
                        type="submit" 
                        value="submit"
                        />
                        <button onClick={() => {
                            window.open('http://localhost:5000/auth/google', '_self')
                        }}
                        className='btn'
                        style={{backgroundColor: '#333'}}
                        >Continue with google</button>
                    <div className='pointer subtitle' onClick={toggle}>{isSignUp ? "already have an account ?" : "don't have an account ?"}</div>
                </form>
            </div>
        </div>
    )
}

