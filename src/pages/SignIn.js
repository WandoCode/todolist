import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import SiginForm from '../components/SigninForm'

function SignIn() {
  const navigate = useNavigate()

  const userConnected = useSelector((state) => state.auth.isConnected)

  useEffect(() => {
    if (userConnected) {
      navigate('/')
    }
  }, [userConnected])

  return (
    <div className="signi">
      <h1>Sign In</h1>
      <SiginForm />
    </div>
  )
}

export default SignIn
