import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import signinIcon from '../assets/signin.svg'

import SiginForm from '../components/SigninForm'

function SignIn() {
  const navigate = useNavigate()

  const userConnected = useSelector((state) => state.auth.isConnected)
  const texts = useSelector((state) => state.language.texts?.signIn)

  useEffect(() => {
    if (userConnected) {
      navigate('/')
    }
  }, [userConnected])

  return (
    <div className="sign-page">
      <img className="sign-page__icon" src={signinIcon} alt="User" />
      <h1 className="h1 sign-page__title">{texts?.title}</h1>
      <h2 className="h2 sign-page__subtitle">{texts?.subtitle}</h2>
      <SiginForm />
    </div>
  )
}

export default SignIn
