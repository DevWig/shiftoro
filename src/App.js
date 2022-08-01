import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Schedule from './pages/Schedule'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import CreateStaffAccount from './pages/CreateStaffAccount'
import Navbar from './components/Navbar'
import Help from './pages/Help'
import ForgotPassword from './pages/ForgotPassword'

import {FirebaseProvider} from './context/FirebaseContext'

function App() {
  return (
    <FirebaseProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/help' element={<Help/>} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />
          <Route path='/schedule' element={<Schedule/>} />
          <Route path='/sign-in' element={<SignIn/>} />
          <Route path='/sign-up' element={<SignUp/>} />
          <Route path='/create-staff-account' element={<CreateStaffAccount/>} />
          
        </Routes>
        
      </Router>
    </FirebaseProvider>
  );
}

export default App;
