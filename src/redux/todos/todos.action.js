import { createAction } from '@reduxjs/toolkit'

const getTodos = createAction('todos/getTodos', (todos) => ({
  payload: [...todos],
}))

const switchItems = createAction('todos/switchItems', (indexA, indexB) => ({
  payload: { indexA, indexB },
}))

const toggleArchiveItem = createAction('todos/toggleArchiveItem', (index) => ({
  payload: index,
}))
const togglePinItem = createAction('todos/togglePinItem', (index) => ({
  payload: index,
}))

export { getTodos, switchItems, toggleArchiveItem, togglePinItem }
