import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'

import { FiEye, FiEyeOff, FiChevronRight } from 'react-icons/fi'
import FirebaseContext from '../context/FirebaseContext'

function SignUp() {
  const {setUser} = useContext(FirebaseContext)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'parent',
  })

  const { firstName, lastName, email, password,} = formData
  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    })
  )}

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      updateProfile(auth.currentUser, {
        displayName: firstName
      })

      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)
      setUser(user)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <>
      <div className="page-container">
        <header>
          <p className="page-header">Welcome to Shiftoro!</p>
        </header>
        <form className="auth-form" onSubmit={onSubmit}>
          <div className="auth-input-container">
            <input
              type="email"
              className="auth-input"
              placeholder="Email"
              id="email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="auth-input-container">
            <input
              type="text"
              className="auth-input"
              placeholder="First Name"
              id="firstName"
              value={firstName}
              onChange={onChange}
            />
          </div>
          <div className="auth-input-container">
            <input
              type="text"
              className="auth-input"
              placeholder="Last Name"
              id="lastName"
              value={lastName}
              onChange={onChange}
            />
          </div>
          <div className="auth-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              className='auth-input'
              placeholder='Password'
              id='password'
              value={password}
              onChange={onChange}  
            />
            <div
              className="show-password-button"
              onClick={() => setShowPassword((prevState) => !prevState)}
            >
              {(showPassword) ? <FiEyeOff/> : <FiEye/>}
            </div>
          </div>
          <button className='auth-button'>
            <p className='auth-text'>
              Sign Up
            </p>
            <div className='auth-caret'>
              <FiChevronRight/>
            </div>
          </button>
        </form>
        <div className='instead-container'>
          <p className='button-descriptor-text'>Already have an account?</p>
          <Link to='/sign-in'>
            <div className='auth-button'>
              <p className='auth-text'>
                Sign In
              </p>
              <div className='auth-caret'>
                <FiChevronRight/>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>  
    
  )
}

export default SignUp