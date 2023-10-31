import React from 'react'
// import Table from './components/Table'
import ProjectDisplay from './components/ProjectDisplay';
import ProjectCreate from './components/ProjectCreate';
import ProductCatalog from './components/ProductCatalog';
import ProductCart from './components/ProductCart';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './contexts/DataContext';
const App = () => {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={<ProjectDisplay/>} />
          <Route path='/create' element={<ProjectCreate/>} />
          <Route path='/edit' element={<ProjectCreate/>} />
          <Route path='/product' element={<ProductCatalog/>} />
          <Route path='/cart' element={<ProductCart/>} />
        </Routes>
      </Router>
    </DataProvider>
  )
}

export default App





