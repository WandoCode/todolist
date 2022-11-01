import { createAction } from '@reduxjs/toolkit'

const connectUser = createAction('auth/connectUser', (email, id, name) => ({
  payload: { email, id, name },
}))

const disconnectUser = createAction('auth/disconnectUser', (id) => ({
  payload: { id },
}))

export { connectUser, disconnectUser }
