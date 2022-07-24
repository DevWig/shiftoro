import { useContext } from 'react'
import { Link } from 'react-router-dom'

import FirebaseContext from '../context/FirebaseContext'

function Navbar() {
  const { user } = useContext(FirebaseContext)
  console.log(user)
  return (
    <>
      <div className="navbar-container">
        <div className="logo-container">
          <h1 className="logo-text">SHIFTORO</h1>
        </div>
        <div className="navlinks-container">
          <Link to='/' className="navlink">Dashboard</Link>
          <Link to='/schedule' className="navlink">Schedule</Link>
          <Link to='/help' className="navlink">Help</Link>
          {(Object.keys(user).length !== 0)
            ?
            (<Link to='/profile' className="navlink">Profile</Link>)
            :
            (<Link to='/sign-in' className="navlink">Sign In</Link>)
          }

        </div>
      </div>

      <div className='welcome-message-container'>
        <h1>Welcome, {user.firstName}</h1>
      </div>
    </>
  )
}

export default Navbar