import { createReducer } from '@reduxjs/toolkit'
import {
  toggleArchiveItem,
  getTodos,
  switchItems,
  togglePinItem,
} from './todos.action'
import { orderTodos } from '../../utils/helpers'

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
    .addCase(toggleArchiveItem, (state, action) => {
      const index = action.payload
      state.todos[index].status = state.todos[index].status === -1 ? 0 : -1
      state.todos = orderTodos([...state.todos])
    })
    .addCase(togglePinItem, (state, action) => {
      const index = action.payload
      state.todos[index].status = state.todos[index].status === 1 ? 0 : 1
      state.todos = orderTodos([...state.todos])
    })
})

export default todosReducer
