import { createReducer } from '@reduxjs/toolkit'
import { connectUser, loading, logoutUser } from './auth.actions'
const initialState = {
  isConnected: false,
  loading: false,
  currentUser: {
    email: undefined,
    id: undefined,
    name: undefined,
  },
}
const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(connectUser, (state, action) => {
      const { email, id, name } = action.payload
      state.isConnected = true
      state.currentUser.email = email
      state.currentUser.id = id
      state.currentUser.name = name
    })
    .addCase(loading, (state, action) => {
      state.loading = action.payload.isLoading
    })
    .addCase(logoutUser, () => initialState)
})

export default authReducer
