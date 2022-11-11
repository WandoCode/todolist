import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getTodosMiddleware } from '../redux/todos/todos.middleware'

import AddTodoForm from '../components/AddTodoForm'
import List from '../components/List'

function Home() {
  const dispatch = useDispatch()

  const userID = useSelector((state) => state.auth.currentUser.id)
  const loading = useSelector((state) => state.todos.loading)
  const texts = useSelector((state) => state.language.texts.homepage)

  useEffect(() => {
    dispatch(getTodosMiddleware(userID))
  }, [])

  return (
    <section className="home">
      {loading ? (
        <h1>{texts.loading}</h1>
      ) : (
        <>
          <h1>{texts.title}</h1>
          <AddTodoForm />
          <List />
        </>
      )}
    </section>
  )
}

export default Home
