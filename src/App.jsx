import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

//import pages
//ex: import functionName from './page'
import Login from './Login';
import SetBoard from './SetBoard';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/set-board" element={<SetBoard />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
