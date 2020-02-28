import React from 'react'
import './App.scss'
import RegisterPage from './pages/register'
import LogInPage from './pages/login'
// import NotificationPage from './pages/'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DashBoardPage from './pages/dashboard'

function App() {
 return (
  <div className="App">
   <Router>
    <Switch>
     <Route path="/register" component={RegisterPage} />
     <Route path="/dashboard/" component={DashBoardPage} />
     <Route path="/" component={LogInPage} />
     {/* <Route path="/registration/" component={RegisterPage} /> */}
    </Switch>
    <ToastContainer
     autoClose={false}
     position={toast.POSITION.BOTTOM_RIGHT}
     className="toast-alert"
    />
   </Router>
  </div>
 )
}

export default App
