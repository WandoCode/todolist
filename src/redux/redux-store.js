import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/auth.reducer'
import todosReducer from './todos/todos.reducer'

const store = configureStore({
  reducer: {
    todos: todosReducer,
    auth: authReducer,
  },
})

export default store
