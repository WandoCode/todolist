import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/auth.reducer'
import languageReducer from './language/language.reducer'
import themeReducer from './theme/theme.reducer'
import todosReducer from './todos/todos.reducer'

const store = configureStore({
  reducer: {
    todos: todosReducer,
    auth: authReducer,
    theme: themeReducer,
    language: languageReducer,
  },
})

export default store
