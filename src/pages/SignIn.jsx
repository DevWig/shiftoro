import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import {FiEye, FieEyeOff} from 'react-icons/fi'


function SignIn() {
  return (
    <>
      <div className="page-container">
        <header>
          <p className="page-header"></p>
        </header>
        <main>
          <form>
            <input
              type="email"
              className="emailInput"
              placeholder="Email"
              id="email"
              // value={email}
              // onChange={onChange}
            />
          </form>
        </main>
      </div>
    </>
    
  )
}

export default SignIn