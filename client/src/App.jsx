import './App.css'
import NavBar from './component/NavBar'
import {BrowserRouter, Route, Routes, } from 'react-router-dom'
import { Comment  } from './component/Comment'
import ListaBodega from './component/ListaBodegas'
import Register from './component/Register'


function App() {
//register
  return (
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={<ListaBodega />} />
          <Route path='comment' element={<Comment/>}/>
          <Route path='register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
