import { createUser, signIn } from '../../store/authenticationStore'
import { connectUser } from './auth.actions'

const signInMiddleware = (email, password) => {
  return async (dispatch) => {
    const user = await signIn(email, password)

    if (user) {
      dispatch(connectUser(user.email, user.uid, user.displayName))
    }
  }
}

const signUpMiddleware = (email, password) => {
  return async (dispatch) => {
    const user = await createUser(email, password)

    if (user) {
      dispatch(connectUser(user.email, user.uid, user.displayName))
    }
  }
}

export { signInMiddleware, signUpMiddleware }
