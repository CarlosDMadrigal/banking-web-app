import React from 'react'
import './App.scss'
import RegisterPage from './pages/register'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
 return (
  <div className="App">
   <RegisterPage></RegisterPage>
   <ToastContainer />
  </div>
 )
}

export default App
