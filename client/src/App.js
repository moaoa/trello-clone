import React from 'react';
import './App.css';
// import io from 'socket.io-client'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HomePage from './Pages/Home'
import AuthPage from './Pages/auth/auth'


function App() {
  // const socket = io('http://localhost:5000')
  
  // socket.on('room', (socket) => {
  //   console.log(socket);
  // })

  return (
    <Router>
        <div className="App">
          <Switch>
            <Route path='/'  component={HomePage}/>
            <Route path='/auth' component={() => <AuthPage/>}/>
          </Switch>
        </div>
   
    </Router>
  );
}

export default App;
