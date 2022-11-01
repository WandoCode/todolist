import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { connectUser } from '../redux/auth/auth.actions'
import { signIn } from '../store/authenticationStore'
import { useNavigate } from 'react-router-dom'

function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = await signIn(email, password)

    if (user) {
      dispatch(connectUser(user.email, user.uid, user.displayName))
      navigate('/')
    }
  }

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
