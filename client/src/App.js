import React, {useEffect} from 'react';
import './App.css';
// import io from 'socket.io-client'
import {BrowserRouter as Router, Route, Switch, Redirect, useLocation} from 'react-router-dom'
import { useSelector , useDispatch} from 'react-redux'
import ProjectPage from './Pages/ProjectPage/ProjectPage'
import AuthPage from './Pages/auth/auth'
import LandingPage from './Pages/LandingPage/LandingPage'
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { signInUserWithGoogle } from './redux/actions/authActions';


function App() {
  // const socket = io('http://localhost:5000')
  
  // socket.on('room', (socket) => {
  //   console.log(socket);
  // })
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const params = new URLSearchParams(useLocation().search)

  useEffect(() => {
    if(params.has('token')){
      console.log('has token : ', params.has('token'));
      const token = params.get('token')
      params.delete('token')
      dispatch(signInUserWithGoogle(token))
    }
  }, [])

  return (
    <Router>
        <div className="App">
          <ToastContainer/>
          <Switch>
          {/* routes Gards */}
            {!user && <Redirect exact from='/' to='/landing'/>}
            {!user && <Redirect from='/project' to='/auth' />}
            {user && <Redirect  exact from ='/' to='/project' />}
            {user && <Redirect from ='/auth' to='/project' />}
            <Route path='/auth'  component={AuthPage}/>
            <Route path='/landing' component={LandingPage} />
            <Route path='/project'  component={ProjectPage}/>
          </Switch>
        </div>
    </Router>
  );
}

export default App;
