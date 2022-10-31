import todosStore from '../../store/todosStore'
import { getTodosListName, orderTodos } from '../../utils/helpers'
import { addTodo, delTodo, getTodos, normalizeList } from './todos.action'
import mockDatas from '../../mock/todos.json'
const testWithLocalEnv = process.env.REACT_APP_LOCAL === 'true'

const storeInstance = todosStore()

const getTodosMiddleware = () => {
  return async (dispatch) => {
    let allTodos = await storeInstance.getTodos()

    if (testWithLocalEnv) {
      if (allTodos.length === 0) {
        await populateDB(mockDatas)

        allTodos = await storeInstance.getTodos()
      }
    }

    const todos = allTodos.find((el) => el.todos)
    const pin = allTodos.find((el) => el.pin)
    const archive = allTodos.find((el) => el.archive)

    console.log(todos)
    const sortedTodos = orderTodos(todos.todos)
    const sortedArchive = orderTodos(archive.archive)
    const sortedPin = orderTodos(pin.pin)

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

const populateDB = async (datas) => {
  const todos = {
    todos: datas.todos,
    archive: datas.archive,
    pin: datas.pin,
  }

  await storeInstance.addCollection('pin', todos.pin)
  await storeInstance.addCollection('todos', todos.todos)
  await storeInstance.addCollection('archive', todos.archive)
}

export { getTodosMiddleware, addTodoMiddleware, synchronize, delTodoMiddleware }
