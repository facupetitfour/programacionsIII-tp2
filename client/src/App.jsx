import './App.css'
import NavBar from './component/NavBar'
import {BrowserRouter, Route, Routes, } from 'react-router-dom'
import { Comment  } from './component/Comment'


function App() {

  return (
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='comment' element={<Comment/>}/>

        </Routes>
      </BrowserRouter>
  )
}

export default App
