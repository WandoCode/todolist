import { createReducer } from '@reduxjs/toolkit'
import { getTodos, switchItems } from './todos.action'

const initialState = { todos: [] }

const todosReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getTodos, (state, action) => {
      state.todos = action.payload
    })
    .addCase(switchItems, (state, action) => {
      const indexA = action.payload.indexA
      const indexB = action.payload.indexB

      const itemA = state.todos[indexA]
      state.todos.splice(indexA, 1)
      state.todos.splice(indexB, 0, itemA)
    })
})

export default todosReducer
