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

const toggleArchiveItem = createAction('todos/toggleArchiveItem', (index) => ({
  payload: index,
}))
const togglePinItem = createAction('todos/togglePinItem', (index) => ({
  payload: index,
}))

export { getTodos, switchItems, toggleArchiveItem, togglePinItem }
