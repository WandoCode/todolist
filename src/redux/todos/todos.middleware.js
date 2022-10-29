import todosStore from '../../store/todosStore'
import { getTodos } from './todos.action'

const getTodosMiddleware = () => {
  return async (dispatch) => {
    const storeInstance = todosStore()
    const todosRaw = await storeInstance.getTodos()

    const todos = todosRaw.filter((el) => el.status === 0)
    const archive = todosRaw.filter((el) => el.status === -1)
    const pin = todosRaw.filter((el) => el.status === 1)

    dispatch(getTodos(todos, archive, pin))
  }
}

export { getTodosMiddleware }
