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

export {
  getTodos,
  switchItems,
  toggleArchiveItem,
  togglePinItem,
  normalizeList,
  addTodo,
}
