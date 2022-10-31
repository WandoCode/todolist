import todosStore from '../../store/todosStore'
import { getTodosListName, orderTodos } from '../../utils/helpers'
import { addTodo, delTodo, getTodos, normalizeList } from './todos.action'
import mockTodos from '../../mock/todos.json'
const testWithLocalEnv = process.env.REACT_APP_LOCAL === 'true'

const storeInstance = todosStore()

const getTodosMiddleware = () => {
  return async (dispatch) => {
    let todosRaw = await storeInstance.getTodos()

    if (testWithLocalEnv) {
      if (todosRaw.length === 0) {
        todosRaw = mockTodos.todos
        for (let i = 0; i < todosRaw.length; i++) {
          const todo = todosRaw[i]
          await storeInstance.addTodo(todo)
        }
      }
    }

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
const delTodoMiddleware = (todoId, tempOrder, status) => {
  return async (dispatch) => {
    await storeInstance.delTodo(todoId)

    dispatch(delTodo(tempOrder, status))
  }
}

const synchronize = (listArray) => {
  return async (dispatch, getState) => {
    if (!listArray) listArray = [-1, 0, 1]

    const { todos } = getState()
    listArray.forEach(async (list) => {
      const listName = getTodosListName(list)
      await storeInstance.saveAll([...todos[listName]])
    })
  }
}
export { getTodosMiddleware, addTodoMiddleware, synchronize, delTodoMiddleware }
