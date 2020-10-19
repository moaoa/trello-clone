import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar'
import Boards from './components/Boards/Boards'
import './App.css';
import io from 'socket.io-client'
import {BrowserRouter as Router} from 'react-router-dom'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'


function App() {
  // const socket = io('http://localhost:5000')
  
  // socket.on('room', (socket) => {
  //   console.log(socket);
  // })

  return (
    <Router>
      <DndProvider backend={HTML5Backend}>
        <div className="App">
          <Sidebar/>
          <Boards/>  
        </div>
      </DndProvider>
    </Router>
  );
}

export default App;
