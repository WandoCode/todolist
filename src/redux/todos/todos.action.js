import { createAction } from '@reduxjs/toolkit'

const getTodos = createAction('todos/getTodos', (todos, archive, pin) => ({
  payload: { todos: [...todos], archive: [...archive], pin: [...pin] },
}))

const switchItems = createAction(
  'todos/switchItems',
  (indexA, indexB, list) => ({
    payload: { indexA, indexB, list },
  })
)

const toggleArchiveItem = createAction(
  'todos/toggleArchiveItem',
  (index, list) => ({
    payload: { index, list },
  })
)

const togglePinItem = createAction('todos/togglePinItem', (index, list) => ({
  payload: { index, list },
}))

const normalizeList = createAction('todos/normalizeList', (list) => ({
  payload: { list },
}))

const addTodo = createAction('todos/addTodo', (todoObject) => ({
  payload: { todo: todoObject },
}))

const delTodo = createAction('todos/delTodo', (todoIndex, list) => ({
  payload: { todoIndex, list },
}))

const loadingTodos = createAction('todos/loadingTodos', (isLoading) => ({
  payload: { isLoading },
}))

const updateTodo = createAction(
  'todos/updateTodo',
  (todoText, todoListInt, todoIndex) => ({
    payload: { todoText, todoListInt, todoIndex },
  })
)

export {
  getTodos,
  addTodo,
  delTodo,
  switchItems,
  toggleArchiveItem,
  togglePinItem,
  normalizeList,
  loadingTodos,
  updateTodo,
}
