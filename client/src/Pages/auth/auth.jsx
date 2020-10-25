import React from 'react';
import './auth.css'
import InputField from '../../components/InputField/InputField'

export default function InputAdornments() {
    return (
        <div className='auth'>
            <div className='auth-form'>
                <h3>Sign Up</h3>
                    <InputField placeholder='email' type='email'/>
                    <InputField placeholder='password' type='password'/>
                    <button onClick={() => {
                        window.open('http://localhost:5000/auth/google', '_self')
                    } } className='btn'>sign up</button>
            </div>
        </div>
    )
}

