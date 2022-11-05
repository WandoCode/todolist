import { auth } from './firebase.config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'

const createUser = async (email, password) => {
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    console.log(credential)
    const user = credential.user
    return { user }
  } catch (err) {
    if (err.code === 'auth/email-already-in-use')
      return { error: 'email-already-in-use' }
    else throw err
  }
}

const signIn = async (email, password) => {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password)
    const user = credential.user
    return { user }
  } catch (err) {
    if (err.code === 'auth/user-not-found') return { error: 'user-not-found' }
    else throw err
  }
}

export { createUser, signIn }
