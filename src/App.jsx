import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

//import pages
//ex: import functionName from './page'
import Login from './Login';
import SetBoard from './SetBoard';
import ComputerLoad from './ComputerLoad';
import Game from './Game';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/set-board" element={<SetBoard />} />
          <Route path="/computer-load" element={<ComputerLoad />} />
          <Route path ="/play-game" element={<Game />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
