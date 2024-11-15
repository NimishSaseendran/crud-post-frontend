import './App.css'
import './bootstrap.min.css'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/dash' element={<Dashboard />} />
      </Routes>

      <ToastContainer />
    </>
  )
}

export default App
