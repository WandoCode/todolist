import { createReducer } from '@reduxjs/toolkit'
import {
  toggleArchiveItem,
  getTodos,
  switchItems,
  togglePinItem,
} from './todos.action'
import { orderTodos, getTodosListName } from '../../utils/helpers'

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

      const list = getTodosListName(action.payload.list)

      const itemA = state[list][indexA]

      state[list].splice(indexA, 1)
      state[list].splice(indexB, 0, itemA)
    })
    .addCase(toggleArchiveItem, (state, action) => {
      const index = action.payload.index
      const oldList = getTodosListName(action.payload.list)

      state[oldList][index].status =
        state[oldList][index].status === -1 ? 0 : -1

      const newList = getTodosListName(state[oldList][index].status)

      state[newList].push({ ...state[oldList][index] })
      state[oldList].splice(index, 1)
    })
    .addCase(togglePinItem, (state, action) => {
      const index = action.payload.index
      const oldList = getTodosListName(action.payload.list)

      state[oldList][index].status = state[oldList][index].status === 1 ? 0 : 1

      const newList = getTodosListName(state[oldList][index].status)

      state[newList].push({ ...state[oldList][index] })
      state[oldList].splice(index, 1)
    })
})

export default todosReducer
