import { createReducer } from '@reduxjs/toolkit'
import { connectUser, loading, logoutUser, setAuthError } from './auth.actions'
const initialState = {
  isConnected: false,
  loading: false,
  currentUser: {
    email: undefined,
    id: undefined,
    name: undefined,
  },
  error: null,
}

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(connectUser, (state, action) => {
      const { email, id, name } = action.payload
      state.isConnected = true
      state.currentUser.email = email
      state.currentUser.id = id
      state.currentUser.name = name
      state.error = null
    })
    .addCase(loading, (state, action) => {
      state.loading = action.payload.isLoading
    })
    .addCase(logoutUser, () => initialState)
    .addCase(setAuthError, (state, action) => {
      state.error = action.payload.error
    })
})

export default authReducer
