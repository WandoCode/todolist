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
export { connectUser, disconnectUser, loading }
