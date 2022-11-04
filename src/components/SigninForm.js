import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signInMiddleware } from '../redux/auth/auth.middlewares'
import Button from './Button'
import userIcon from '../assets/user-solid.svg'
import eyeIcon from '../assets/eye-solid.svg'
import { Link } from 'react-router-dom'

function SiginForm() {
  const dispatch = useDispatch()

  const loading = useSelector((state) => state.auth.loading)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [currentFocus, setCurrentFocus] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(signInMiddleware(email, password))
  }

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

      <Link className="sign-form__link" to="/signup">
        Create an new account here!
      </Link>
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
