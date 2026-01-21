import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './Layout'
import Home from './components/home/Home'
// import Compare from './components/Compare'
// import Clear from './components/Clear'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/compare'/>
          <Route path='/constitution' />
          <Route path='/documents'/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App