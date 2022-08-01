import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { FiEye, FiEyeOff, FiChevronRight } from 'react-icons/fi'

import FirebaseContext from '../context/FirebaseContext'

function SignIn() {
  const {setUser} = useContext(FirebaseContext)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData
  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    })
  )}

  const onSubmit = async(e) => {
    e.preventDefault()
    console.log('form has been submitted')
    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      
      if (userCredential.user) {
        setUser(userCredential.user)
        navigate('/')
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="page-container">
        <header>
          <p className="page-header">Welcome Back!</p>
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
          <Link to='/forgot-password' className='forgot-password-link'>Forgot Password</Link>
          <button className='auth-button'>
            <p className='auth-text'>
              Sign In
            </p>
            <div className='auth-caret'>
              <FiChevronRight/>
            </div>
          </button>
        </form>
        <div className='instead-container'>
          <p className='button-descriptor-text'>New Here?</p>
          <Link to='/sign-up'>
            <div className='auth-button'>
              <p className='auth-text'>
                Sign Up
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

export default SignIn