import './App.css'
import NavBar from './component/NavBar'
import {BrowserRouter, Route, Routes, } from 'react-router-dom'
import Register from './component/Register'
import Carrosel from './component/Carrosel'
import ListaBodega from './component/ListaBodegas'


function App() {
//register
  return (
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Carrosel />} />
          <Route path='register' element={<Register/>}/>
          <Route path='listabodega' element={<ListaBodega/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
