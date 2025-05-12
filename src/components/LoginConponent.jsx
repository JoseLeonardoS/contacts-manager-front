import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const LoginConponent = () => {

  const [logged, setLogged] = useState(false)
  const [logout, setLogout] = useState('bx-user')

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      setLogged(true)
    } else {
      setLogged(false)
    }
  })

  function handleLogOut() {
    localStorage.removeItem('token')
    window.location.reload()
  }

  if (logged) {
    return (
      <div className='loginComp'>
        <Link to='/dashboard'><i className="bx bx-home-alt-2" title="Home"></i></Link>
        <Link
          onMouseEnter={() => setLogout('bx-log-out')}
          onMouseLeave={() => setLogout('bxs-user-circle')}
          onClick={handleLogOut}>
          <i className={`bx ${logout}`} title='logout' ></i>
        </Link>
      </div >
    )
  } else {
    return (
      <div className='loginComp'>
        <Link to='/'><i className="bx bx-home-alt-2" title="Home"></i></Link>
        <Link to='/sign-in'>
          <i className='bx bx-log-in' title='login'></i>
        </Link>
      </div>
    )
  }
}

export default LoginConponent
