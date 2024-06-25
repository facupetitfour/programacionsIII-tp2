import './App.css'
import NavBar from './component/NavBar'
import {BrowserRouter, Route, Routes, } from 'react-router-dom'
import { Comment  } from './component/Comment'
import ListaBodega from './component/ListaBodegas'

function App() {

  return (
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={<ListaBodega />} />
          <Route path='comment' element={<Comment/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
