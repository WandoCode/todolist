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

      const tempTodos = [...state.todos]

      const itemA = tempTodos[indexA]
      tempTodos.splice(indexA, 1)
      tempTodos.splice(indexB, 0, itemA)

      return { todos: tempTodos }
    })
})

export default todosReducer
