import todosStore from '../../store/todosStore'
import { getTodosListName, orderTodos } from '../../utils/helpers'
import { addTodo, delTodo, getTodos, normalizeList } from './todos.action'
import mockDatas from '../../mock/todos.json'
const testWithLocalEnv = process.env.REACT_APP_LOCAL === 'true'

const storeInstance = todosStore()

const populateDB = async (datas) => {
  const todos = { todos: [], archive: [], pin: [] }

  const mockTodos = datas.todos

  for (let i = 0; i < mockTodos.length; i++) {
    const todo = mockTodos[i]

    await storeInstance.addTodo(todo)

    const listName = getTodosListName(todo.status)

    todos[listName].push(todo)
  }
  return todos
}

const getTodosMiddleware = () => {
  return async (dispatch) => {
    let todosRaw = await storeInstance.getTodos(0)
    let archiveRaw = await storeInstance.getTodos(-1)
    let pinRaw = await storeInstance.getTodos(1)

    if (testWithLocalEnv) {
      if (
        todosRaw.length === 0 &&
        archiveRaw.length === 0 &&
        pinRaw.length === 0
      ) {
        const todos = await populateDB(mockDatas)

        todosRaw = todos.todos
        archiveRaw = todos.archive
        pinRaw = todos.pin
      }
    }

    const sortedTodos = orderTodos(todosRaw)
    const sortedArchive = orderTodos(archiveRaw)
    const sortedPin = orderTodos(pinRaw)

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
