import { useState } from 'react'
import { Home, Navbar } from './components'
import { BrowserRouter, Route, Routes } from 'react-router'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        {/* <Route path='/compare' element={<Compare />}/> */}
        {/* <Route path='/constitution' element={<Clear />}/> */}
        {/* <Route path='/documents' element={<Clear />}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
