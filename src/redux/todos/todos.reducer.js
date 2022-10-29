import { createReducer } from '@reduxjs/toolkit'
import { archiveItem, getTodos, switchItems } from './todos.action'

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
    .addCase(archiveItem, (state, action) => {
      const index = action.payload
      state.todos[index].status = -1
    })
})

export default todosReducer
