import { createUser, signIn } from '../../store/authenticationStore'
import { connectUser, loading, setAuthError } from './auth.actions'

const signInMiddleware = (email, password) => {
  return async (dispatch) => {
    dispatch(loading(true))
    const rep = await signIn(email, password)

    if (rep.error) {
      dispatch(setAuthError(rep.error))
    } else if (rep.user) {
      dispatch(connectUser(rep.user.email, rep.user.uid, rep.user.displayName))
    }
    dispatch(loading(false))
  }
}

const signUpMiddleware = (email, password) => {
  return async (dispatch) => {
    dispatch(loading(true))
    const rep = await createUser(email, password)

    if (rep.error) {
      dispatch(setAuthError(rep.error))
    }
    if (rep.user) {
      dispatch(connectUser(rep.user.email, rep.user.uid, rep.user.displayName))
    }
    dispatch(loading(false))
  }
}

export { signInMiddleware, signUpMiddleware }
