import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ children }) {
  const isConnected = useSelector((state) => state.auth.isConnected)

  if (isConnected) return children
  else return <Navigate to="/signin" />
}

export default PrivateRoute
