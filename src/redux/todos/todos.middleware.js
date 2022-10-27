import todosStore from '../../store/todosStore'
import { getTodos } from './todos.action'

const getTodosMiddleware = () => {
  return async (dispatch) => {
    const storeInstance = todosStore()
    const todos = await storeInstance.getTodos()
    dispatch(getTodos(todos))
  }
}

export { getTodosMiddleware }
