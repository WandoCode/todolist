import { createReducer } from '@reduxjs/toolkit'
import { connectUser } from './auth.actions'
const initialState = {
  isConnected: false,
  currentUser: {
    email: undefined,
    id: undefined,
    name: undefined,
  },
}
const authReducer = createReducer(initialState, (builder) => {
  builder.addCase(connectUser, (state, action) => {
    const { email, id, name } = action.payload
    state.isConnected = true
    state.currentUser.email = email
    state.currentUser.id = id
    state.currentUser.name = name
  })
})

export default authReducer
