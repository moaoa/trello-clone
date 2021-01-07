import React from 'react'
import './LandingPage.css'
import {Link} from 'react-router-dom'
import {  toast } from 'react-toastify';

export default function LandingPage() {
    
    
    return (
        <>
        <div className="overlay-landingPage"></div>
        <div className="LandingPage">
            <header>
                <div className='trello-logo'>trello</div>
                <ul>
                     <li className='pointer'><Link to='/project'>myProjects</Link></li>
                     <li className='pointer'><Link to='/auth'>Login</Link></li>
                     <li  className='signup-btn pointer'><Link to='/auth'>Sign Up</Link></li>
                </ul>    
            </header>
            <div className="hero-section">
                <h1>Get More Done</h1>
                <p>Trello boards, lists, and cards enable you to organize and priortize Your projects</p>
                <button className="signup-btn">SIGN UP FOR FREE</button>
            </div>
        </div>
        </> 
    )
}
