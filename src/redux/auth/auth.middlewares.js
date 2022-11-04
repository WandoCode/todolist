import { createUser, signIn } from '../../store/authenticationStore'
import { connectUser, loading } from './auth.actions'

const signInMiddleware = (email, password) => {
  return async (dispatch) => {
    dispatch(loading(true))
    const user = await signIn(email, password)

    if (user) {
      dispatch(connectUser(user.email, user.uid, user.displayName))
    }
    dispatch(loading(false))
  }
}

const signUpMiddleware = (email, password) => {
  return async (dispatch) => {
    dispatch(loading(true))

    const user = await createUser(email, password)
    if (user) {
      dispatch(connectUser(user.email, user.uid, user.displayName))
    }
    dispatch(loading(false))
  }
}

export { signInMiddleware, signUpMiddleware }
