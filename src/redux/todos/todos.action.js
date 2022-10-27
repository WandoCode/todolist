import { createAction } from '@reduxjs/toolkit'

const getTodos = createAction('todos/getTodos', (todos) => ({
  payload: [...todos],
}))

export { getTodos }
