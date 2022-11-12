import { Link } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import rightArrow from '../assets/arrow_right.svg'
import userIcon from '../assets/user-solid.svg'
import eyeIcon from '../assets/eye-solid.svg'

import validation from '../utils/formValidation'

import { signInMiddleware } from '../redux/auth/auth.middlewares'
import { setAuthError } from '../redux/auth/auth.actions'

import Button from './Button'

function SiginForm() {
  const dispatch = useDispatch()

  const loading = useSelector((state) => state.auth.loading)
  const authError = useSelector((state) => state.auth.error)
  const texts = useSelector((state) => state.language.texts?.signIn)

  const [currentFocus, setCurrentFocus] = useState()
  const [validationErrors, setValidationErrors] = useState([])
  const [formInputs, setFormInputs] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    return () => dispatch(setAuthError(null))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const validator = validation({
      email: formInputs.email,
      password: formInputs.password,
    })

    const validationErrors = validator.validateForm()

    if (validationErrors.length > 0) {
      setValidationErrors(validationErrors)
    } else {
      dispatch(signInMiddleware(formInputs.email, formInputs.password))
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
      {(authError === 'user-not-found' || authError === 'wrong-password') && (
        <div className="sign-form__error">{texts?.errorSubmit}</div>
      )}
      <div className={getClassRow('email')}>
        <label className="sign-form__label" htmlFor="email">
          {texts?.email}
        </label>

        <input
          className={getClassInput('email')}
          type="email"
          name="email"
          id="email"
          value={formInputs.email}
          onChange={(e) =>
            setFormInputs((prev) => ({ ...prev, email: e.target.value }))
          }
          onFocus={() => setCurrentFocus('email')}
          onBlur={() => setCurrentFocus(undefined)}
        />

        <img src={userIcon} alt="User" className="sign-form__icon" />
      </div>

      {validationErrors.includes('email') && (
        <div className="sign-form__error">{texts?.errorEmail}</div>
      )}

      <div className={getClassRow('password')}>
        <label className="sign-form__label" htmlFor="password">
          {texts?.password}
        </label>

        <input
          className={getClassInput('password')}
          type="password"
          name="password"
          id="password"
          value={formInputs.password}
          onChange={(e) =>
            setFormInputs((prev) => ({ ...prev, password: e.target.value }))
          }
          onFocus={() => setCurrentFocus('password')}
          onBlur={() => setCurrentFocus(undefined)}
        />
        <img src={eyeIcon} alt="Eye" className="sign-form__icon" />
      </div>

      {validationErrors.includes('password') && (
        <div className="sign-form__error">{texts?.errorPassword}</div>
      )}

      <Link className="sign-form__link" to="/signup">
        {texts?.createAccount}
      </Link>

      <Button
        image={rightArrow}
        text={texts?.formSubmit}
        onClickHandler={handleSubmit}
        disabled={loading}
        classesArr={['main']}
      />
    </form>
  )
}

export default SiginForm
