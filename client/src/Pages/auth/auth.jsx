import React from 'react';
import './auth.css'
import InputField from '../../components/InputField/InputField'
import axios from 'axios'

export default function InputAdornments() {
    return (
        <div className='auth'>
            <div className='auth-form'>
                <h3>Sign Up</h3>
                    <InputField placeholder='email' type='email'/>
                    <InputField placeholder='password' type='password'/>
                    <button onClick={() => axios.get('/auth/google') } className='btn'>sign up</button>
            </div>
        </div>
    )
}

