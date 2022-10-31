import todosStore from '../../store/todosStore'
import { orderTodos } from '../../utils/helpers'
import { addTodo, getTodos, normalizeList } from './todos.action'

const storeInstance = todosStore()

const getTodosMiddleware = () => {
  return async (dispatch) => {
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

const addTodoMiddleware = (todoObject) => {
  return async (dispatch) => {
    const newTodo = {
      ...todoObject,
      status: 0,
      creationDate: new Date().toString(),
    }

    const addedTodo = await storeInstance.addTodo(newTodo)

    dispatch(addTodo(addedTodo))
    dispatch(normalizeList(0))
  }
}

export { getTodosMiddleware, addTodoMiddleware }
