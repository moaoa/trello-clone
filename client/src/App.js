import React, {useEffect} from 'react';
import './App.css';
import io from 'socket.io-client'
import {BrowserRouter as Router, Route, Switch, Redirect, useLocation} from 'react-router-dom'
import { useSelector , useDispatch} from 'react-redux'
import ProjectPage from './Pages/ProjectPage/ProjectPage'
import AuthPage from './Pages/auth/auth'
import LandingPage from './Pages/LandingPage/LandingPage'
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { signInUserWithGoogle } from './redux/actions/authActions';
import { setProjects } from './redux/actions/project'
import  Axios from 'axios'


function App() {

  const user = useSelector(state => state.auth.user)
  let socket
  if(user) {
    socket = io('http://localhost:5000', {
      query:{
        auth: user?._id
      }
    })
    
  }

  const dispatch = useDispatch()
  const params = new URLSearchParams(useLocation().search)
  
  const token = params.get('token')

  useEffect(() => {
    if(params.has('token')){
      params.delete('token')
      dispatch(signInUserWithGoogle(token))
    }
  }, [])

  useEffect(() => {
    if(user){
      Axios.get('/projects', {
        headers: {
          authorization: `Bearer ${user.token}`
        }
      })
      .then(res => dispatch(setProjects(res.data.projects)))
      .catch(e => {
        console.log(e);
        toast.error('Something Went Wrong')
      })
    }


    if(user) {
      socket = io('http://localhost:5000', {
        query:{
          auth: user?._id
        }
      })
    }
  }, [user])



  return (
    <Router>
        <div className="App">
          <ToastContainer/>
            {!user && <Redirect  to='/landing' />}
          <Switch>
            {!user  && <Redirect exact from='/' to='/auth' />}
            {user && <Redirect exact from='/' to='/dashboard'/>}
            {user && <Redirect from='/auth' to='/dashboard'/>}
            <Route path='/auth'  component={AuthPage}/>
            <Route path='/landing' component={LandingPage} />
            <Route path='/'  component={ProjectPage}/>
          </Switch>
        </div>
    </Router>
  );
}

export default App;
