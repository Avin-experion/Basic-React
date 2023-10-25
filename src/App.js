import React from 'react'
// import Table from './components/Table'
import ProjectDisplay from './components/ProjectDisplay';
import ProjectCreate from './components/ProjectCreate';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<ProjectDisplay/>} />
        <Route path='/create' element={<ProjectCreate/>} />
        <Route path='/edit' element={<ProjectCreate/>} />
      </Routes>
    </Router>
  )
}

export default App





