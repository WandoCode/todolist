import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './todos/todos.reducer'

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
})

export default store
