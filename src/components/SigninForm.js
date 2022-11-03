import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signInMiddleware } from '../redux/auth/auth.middlewares'
import Button from './Button'

function SiginForm() {
  const dispatch = useDispatch()

  const loading = useSelector((state) => state.auth.loading)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(signInMiddleware(email, password))
  }
  return (
    <form action="">
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
      <Button
        text="Login"
        onClickHandler={handleSubmit}
        disabled={loading}
        type="main"
      />
    </form>
  )
}

export default SiginForm
