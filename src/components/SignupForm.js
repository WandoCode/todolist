import { Link } from 'react-router-dom'
import { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { signUpMiddleware } from '../redux/auth/auth.middlewares'
import validation from '../utils/formValidation'

import Button from './Button'

import userIcon from '../assets/user-solid.svg'
import eyeIcon from '../assets/eye-solid.svg'
import { setAuthError } from '../redux/auth/auth.actions'

function SignupForm() {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.auth.loading)
  const authError = useSelector((state) => state.auth.error)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [currentFocus, setCurrentFocus] = useState()
  const [validationErrors, setValidationErrors] = useState([])

  useEffect(() => {
    return () => dispatch(setAuthError(null))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const validator = validation({
      email,
      password,
      confirmation,
    })

    const validationErrors = validator.validateForm()

    if (validationErrors.length > 0) {
      setValidationErrors(validationErrors)
    } else {
      dispatch(signUpMiddleware(email, password))
    }
  }

  const getClassRow = useCallback(
    (field) => {
      return currentFocus === field
        ? 'sign-form__row sign-form__row--focus'
        : 'sign-form__row'
    },
    [currentFocus]
  )

  const getClassInput = useCallback(
    (field) => {
      return validationErrors.includes(field)
        ? 'sign-form__input sign-form__input--error'
        : 'sign-form__input'
    },
    [validationErrors]
  )

  return (
    <form className="sign-form">
      {authError === 'email-already-in-use' && (
        <div className="sign-form__error">Email already used</div>
      )}
      <div className={getClassRow('email')}>
        <label className="sign-form__label" htmlFor="email">
          Email
        </label>

        <input
          className={getClassInput('email')}
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

      <div className={getClassRow('password')}>
        <label className="sign-form__label" htmlFor="password">
          Password
        </label>

        <input
          className={getClassInput('password')}
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
        <div className="sign-form__error">Invalid password</div>
      )}

      <div className={getClassRow('confirmation')}>
        <label className="sign-form__label" htmlFor="confirmation">
          Confirm password
        </label>

        <input
          className={getClassInput('confirmation')}
          type="password"
          name="confirmation"
          id="confirmation"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          onFocus={() => setCurrentFocus('confirmation')}
          onBlur={() => setCurrentFocus(undefined)}
        />

        <img src={eyeIcon} alt="Eye" className="sign-form__icon" />
      </div>

      {validationErrors.includes('confirmation') && (
        <div className="sign-form__error">
          Password and confirmation are different
        </div>
      )}

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
