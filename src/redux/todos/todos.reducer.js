import { createReducer } from '@reduxjs/toolkit'
import { getTodos } from './todos.action'

const initialState = { todos: [] }

const todosReducer = createReducer(initialState, (builder) => {
  builder.addCase(getTodos, (state, action) => {
    state.todos = action.payload
  })
})

export default todosReducer
