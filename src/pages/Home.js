import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import List from '../components/List'
import { logoutUser } from '../redux/auth/auth.actions'
import { getTodosMiddleware } from '../redux/todos/todos.middleware'

function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userID = useSelector((state) => state.auth.currentUser.id)

  dispatch(getTodosMiddleware(userID))

  const handleLogOut = (e) => {
    e.preventDefault()
    dispatch(logoutUser())
    navigate('/')
  }

  return (
    <div className="home">
      <button onClick={handleLogOut}>Logout</button>
      <List />
    </div>
  )
}

export default Home
