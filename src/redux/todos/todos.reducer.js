import { createReducer } from '@reduxjs/toolkit'
import {
  toggleArchiveItem,
  getTodos,
  switchItems,
  togglePinItem,
} from './todos.action'
import { orderTodos } from '../../utils/helpers'

const initialState = { todos: [], archive: [], pin: [] }

const todosReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getTodos, (state, action) => {
      state.todos = action.payload.todos
      state.archive = action.payload.archive
      state.pin = action.payload.pin
    })
    .addCase(switchItems, (state, action) => {
      const indexA = action.payload.indexA
      const indexB = action.payload.indexB
      const listSelector = action.payload.list

      const listChoice = { 1: 'pin', 0: 'todos', '-1': 'archive' }
      const list = listChoice[listSelector]

      const itemA = state[list][indexA]

      state[list].splice(indexA, 1)
      state[list].splice(indexB, 0, itemA)
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
