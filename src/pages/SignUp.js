import { useEffect } from 'react'
import { useSelector } from 'react-redux'

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
    <div className="signup">
      <h1>Sign UP</h1>
      <SignupForm />
    </div>
  )
}

export default SignUp
