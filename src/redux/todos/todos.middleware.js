import todosStore from '../../store/todosStore'
import { orderTodos } from '../../utils/helpers'
import { getTodos } from './todos.action'

const getTodosMiddleware = () => {
  return async (dispatch) => {
    const storeInstance = todosStore()
    const todosRaw = await storeInstance.getTodos()

    const todos = todosRaw.filter((el) => el.status === 0)
    const archive = todosRaw.filter((el) => el.status === -1)
    const pin = todosRaw.filter((el) => el.status === 1)

    const sortedTodos = orderTodos(todos)
    const sortedArchive = orderTodos(archive)
    const sortedPin = orderTodos(pin)

    dispatch(getTodos(sortedTodos, sortedArchive, sortedPin))
  }
}

export { getTodosMiddleware }
