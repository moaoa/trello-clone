import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar'
import Boards from './components/Boards/Boards'
import './App.css';
import io from 'socket.io-client'
import {BrowserRouter as Router} from 'react-router-dom'


function App() {
  const socket = io('http://localhost:5000')
  
  socket.on('room', (socket) => {
    console.log(socket);
  })

  return (
    <Router>
      <div className="App">
        <Sidebar/>
        <Boards/>  
      </div>
    </Router>
  );
}

export default App;
