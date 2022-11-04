import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/auth.reducer'
import themeReducer from './theme/theme.reducer'
import todosReducer from './todos/todos.reducer'

const store = configureStore({
  reducer: {
    todos: todosReducer,
    auth: authReducer,
    theme: themeReducer,
  },
})

export default store
