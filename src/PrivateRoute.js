import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ children }) {
  const isConnected = useSelector((state) => state.auth.isConnected)

  return isConnected ? children : <Navigate to="/signin" />
}

export default PrivateRoute
