import React, {useEffect} from 'react';
import './App.css';
import io from 'socket.io-client'
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation} from 'react-router-dom'
import { useSelector , useDispatch} from 'react-redux'
import ProjectPage from './Pages/ProjectPage/ProjectPage'
import AuthPage from './Pages/auth/auth'
import LandingPage from './Pages/LandingPage/LandingPage'
import {  toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { signInUserWithGoogle } from './redux/actions/authActions';
import { addInvite , addMember} from './redux/actions/project';

let socket

export const Context = React.createContext()


function App() {

  const user = useSelector(state => state.auth.user)

  const dispatch = useDispatch()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  
  const token = params.get('token')

  useEffect(() => {
    if(params.has('token')){
      params.delete('token')
      dispatch(signInUserWithGoogle(token))
    }
  }, [])

  useEffect(() => {
    if(user) {
      socket = io('http://localhost:5000', {
        query:{
          auth: user._id
        }
      })
      socket.on('invite', (data) => {
        if(!data.invite)  throw Error('invite is undefiend' + data.invite)
        dispatch(addInvite(data.invite)) 
      })
      socket.on('addMember', data => {
        dispatch(addMember(data.addedMember, data.projectId))
      })
    }
  }, [user])

  const sendInvite = (data)  => {
    const socketId = data.socketId
    if(socketId && socketId !== 'offline')
    if(socket) socket.emit('notification', data)
  }
  const inviteAccepted = (addedMember, projectId) => {
    socket.emit('inviteAccepted', {addedMember, projectId})
  }


 
 

  return (
    <Context.Provider value={{sendInvite, inviteAccepted}}>
      <Router>
          <div className="App">
            <ToastContainer/>
              {!user && <Redirect  to='/landing' />}
            <Switch>
              {!user  && <Redirect exact from='/' to='/auth' />}
              {!user && <Redirect from='/dashboard' to='/auth' />}
              {!user && <Redirect from='/my-projects' to='/auth' />}
              {user && <Redirect exact from='/' to='/dashboard'/>}
              {user && <Redirect from='/auth' to='/dashboard'/>}
              <Route path='/auth'  component={AuthPage}/>
              <Route path='/landing' component={LandingPage} />
              <Route path='/'  component={ProjectPage}/>
            </Switch>
          </div>
      </Router>
    </Context.Provider>
  );
}

export default App;
