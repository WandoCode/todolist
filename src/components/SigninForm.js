import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signInMiddleware } from '../redux/auth/auth.middlewares'
import Button from './Button'
import userIcon from '../assets/user-solid.svg'
import eyeIcon from '../assets/eye-solid.svg'
import { Link } from 'react-router-dom'
import { validateForm } from '../utils/formValidation'

function SiginForm() {
  const dispatch = useDispatch()

  const loading = useSelector((state) => state.auth.loading)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [currentFocus, setCurrentFocus] = useState()
  const [validationErrors, setValidationErrors] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateForm({ email, password })

    if (validationErrors.length > 0) {
      setValidationErrors(validationErrors)
    } else {
      dispatch(signInMiddleware(email, password))
    }
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
          className={
            validationErrors.includes('email')
              ? 'sign-form__input sign-form__input--error'
              : 'sign-form__input'
          }
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
      {validationErrors.includes('email') && (
        <div className="sign-form__error">Invalid email</div>
      )}
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
          className={
            validationErrors.includes('password')
              ? 'sign-form__input sign-form__input--error'
              : 'sign-form__input'
          }
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
      {validationErrors.includes('password') && (
        <div className="sign-form__error">Password incorrect</div>
      )}

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
