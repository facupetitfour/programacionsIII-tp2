import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import ProtectedRoute from './component/ProtectedRoute';
import InicioSesion from "./pages/LogIn"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<InicioSesion/>} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
