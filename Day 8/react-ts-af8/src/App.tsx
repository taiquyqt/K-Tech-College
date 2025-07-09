import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Form1/HomePage'
import LoginForm from './pages/Form1/LoginForm'
import SignupForm from './pages/Form1/SignUpForm'
import FormRegister from './pages/Form2/FormRegister'
import AllForm from './pages/AllForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Hiển thị Form chính */}
        <Route path='/' element={<AllForm />} />
        {/* Form 1 */}
        <Route path='/home' element={<HomePage />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
        {/* Form 2 */}
        <Route path='/formregister' element={<FormRegister />} />
        {/* Form 3 */}
      </Routes>
    </BrowserRouter>
  )
}

export default App