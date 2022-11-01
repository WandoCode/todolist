import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { signInMiddleware } from '../redux/auth/auth.middlewares'

function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userConnected = useSelector((state) => state.auth.isConnected)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    dispatch(signInMiddleware(email, password))
  }

  useEffect(() => {
    if (userConnected) {
      navigate('/')
    }
  }, [userConnected])

  return (
    <div className="signup">
      <h1>Sign In</h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Create user</button>
      </form>
    </div>
  )
}

export default SignIn
