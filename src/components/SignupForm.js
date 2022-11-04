import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signUpMiddleware } from '../redux/auth/auth.middlewares'
import userIcon from '../assets/user-solid.svg'
import eyeIcon from '../assets/eye-solid.svg'
import signupIcon from '../assets/circle-user-solid.svg'

import Button from './Button'
import { Link } from 'react-router-dom'
function SignupForm() {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.auth.loading)
  const [email, setEmail] = useState('')
  const [currentFocus, setCurrentFocus] = useState()

  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(signUpMiddleware(email, password))
  }

  //TODO: ajouter confirmer password
  return (
    <form className="sign-form">
      <div
        className={
          currentFocus === 'email'
            ? 'sign-form__row sign-form__row--focus'
            : 'sign-form__row'
        }
      >
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
          onFocus={() => setCurrentFocus('email')}
          onBlur={() => setCurrentFocus(undefined)}
        />
        <img src={userIcon} alt="User" className="sign-form__icon" />
      </div>
      <div
        className={
          currentFocus === 'password'
            ? 'sign-form__row sign-form__row--focus'
            : 'sign-form__row'
        }
      >
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
          onFocus={() => setCurrentFocus('password')}
          onBlur={() => setCurrentFocus(undefined)}
        />
        <img src={eyeIcon} alt="Eye" className="sign-form__icon" />
      </div>
      <Link className="sign-form__link" to="/signin">
        You already have an account?
      </Link>
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
