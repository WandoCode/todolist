import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import signupIcon from '../assets/circle-user-solid.svg'

import { useNavigate } from 'react-router-dom'
import SignupForm from '../components/SignupForm'

function SignUp() {
  const navigate = useNavigate()

  const userConnected = useSelector((state) => state.auth.isConnected)

  useEffect(() => {
    if (userConnected) {
      navigate('/')
    }
  }, [userConnected])

  return (
    <div className="sign-page">
      <img className="sign-page__icon" src={signupIcon} alt="User" />

      <h1 className="h1 sign-page__title">Create account!</h1>
      <SignupForm />
    </div>
  )
}

export default SignUp
