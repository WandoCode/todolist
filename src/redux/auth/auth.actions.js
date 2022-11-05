import { createAction } from '@reduxjs/toolkit'

const connectUser = createAction('auth/connectUser', (email, id, name) => ({
  payload: { email, id, name },
}))

const disconnectUser = createAction('auth/disconnectUser', (id) => ({
  payload: { id },
}))

const loading = createAction('auth/loading', (isLoading) => ({
  payload: { isLoading },
}))

const logoutUser = createAction('auth/logoutUser')

const setAuthError = createAction('auth/setAuthError', (error) => ({
  payload: { error },
}))

export { connectUser, disconnectUser, loading, logoutUser, setAuthError }
