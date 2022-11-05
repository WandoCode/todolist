import { useDispatch, useSelector } from 'react-redux'
import List from '../components/List'
import { getTodosMiddleware } from '../redux/todos/todos.middleware'
import { useEffect } from 'react'

function Home() {
  const dispatch = useDispatch()

  const userID = useSelector((state) => state.auth.currentUser.id)
  const loading = useSelector((state) => state.todos.loading)

  useEffect(() => {
    dispatch(getTodosMiddleware(userID))
  }, [])

  return <div className="home">{loading ? <h1>Loading...</h1> : <List />}</div>
}

export default Home
