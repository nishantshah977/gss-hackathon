import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './Layout'
import Home from './components/home/Home'
import DocumentUpload from './components/compare/DocumentUpload'
// import Compare from './components/Compare'
// import Clear from './components/Clear'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/compare'/>
          <Route path='/chat'/>
          <Route path='/documents'  element={<DocumentUpload />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App