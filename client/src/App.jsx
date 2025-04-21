import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/login'
import Signup from './pages/auth/signup'
import Myaccount from './pages/myaccount'
import Company from './pages/company'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Company />} />
        <Route path='/myaccount' element={<Myaccount />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  )
}

export default App