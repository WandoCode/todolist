import { createAction } from '@reduxjs/toolkit'

const getTodos = createAction('todos/getTodos', (todos) => ({
  payload: [...todos],
}))

const switchItems = createAction('todos/switchItems', (indexA, indexB) => ({
  payload: { indexA, indexB },
}))

const archiveItem = createAction('todos/archiveItem', (index) => ({
  payload: index,
}))

export { getTodos, switchItems, archiveItem }
