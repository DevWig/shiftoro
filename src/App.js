import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Schedule from './pages/Schedule'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Navbar from './components/Navbar'
import Help from './pages/Help'

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
          <Route path='/schedule' element={<Schedule/>} />
          <Route path='/sign-in' element={<SignIn/>} />
          <Route path='/sign-up' element={<SignUp/>} />
          
        </Routes>
        
      </Router>
    </FirebaseProvider>
  );
}

export default App;
