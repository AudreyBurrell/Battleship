import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

//import pages
//ex: import functionName from './page'
import Login from './Login';
import SetBoard from './SetBoard';
import ComputerLoad from './ComputerLoad';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/set-board" element={<SetBoard />} />
          <Route path="/computer-load" element={<ComputerLoad />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
