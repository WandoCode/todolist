import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signUpMiddleware } from '../redux/auth/auth.middlewares'

import Button from './Button'
function SignupForm() {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.auth.loading)
  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(signUpMiddleware(email, password))
  }

  //TODO: ajouter confirmer password
  return (
    <form className="sign-form">
      <div className="sign-form__row">
        <label className="sign-form__label" htmlFor="email">
          Email
        </label>
        <input
          className="sign-form__input"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="sign-form__row">
        <label className="sign-form__label" htmlFor="password">
          Password
        </label>
        <input
          className="sign-form__input"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        text="Create user"
        onClickHandler={handleSubmit}
        type={'main'}
        disabled={loading}
      />
    </form>
  )
}

export default SignupForm
