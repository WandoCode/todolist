import todosStore from '../../store/todosStore'
import { getTodosListName, orderTodos } from '../../utils/helpers'
import { getTodos } from './todos.action'
import mockDatas from '../../mock/todos.json'

const testWithLocalEnv = process.env.REACT_APP_LOCAL === 'true'

const storeInstance = todosStore()

const getTodosMiddleware = (userID) => {
  return async (dispatch) => {
    let allTodos = await storeInstance.getTodos(userID)

    if (testWithLocalEnv && allTodos.length === 0) {
      await initDB(userID, mockDatas)
      allTodos = await storeInstance.getTodos(userID)
    }

    if (allTodos.length === 0) await initDB(userID)

    const todos = allTodos.find((el) => el.todos)
    const pin = allTodos.find((el) => el.pin)
    const archive = allTodos.find((el) => el.archive)

    const sortedTodos = orderTodos(todos.todos)
    const sortedArchive = orderTodos(archive.archive)
    const sortedPin = orderTodos(pin.pin)

    dispatch(getTodos(sortedTodos, sortedArchive, sortedPin))
  }
}

const synchronize = (userID, listArray) => {
  return async (dispatch, getState) => {
    if (!listArray) listArray = [-1, 0, 1]

    const { todos } = getState()

    listArray.forEach(async (list) => {
      const listName = getTodosListName(list)
      await storeInstance.saveCollection([...todos[listName]], listName, userID)
    })
  }
}

const initDB = async (userID, datas) => {
  let todos
  if (datas) {
    todos = {
      todos: datas.todos,
      archive: datas.archive,
      pin: datas.pin,
    }
  } else {
    todos = {
      todos: [],
      archive: [],
      pin: [],
    }
  }

  for (const key in todos) {
    await storeInstance.addCollection(key, todos[key], userID)
  }
}

export { getTodosMiddleware, synchronize }
