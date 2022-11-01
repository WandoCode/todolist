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
    const user = credential.user
    return user
  } catch (err) {
    console.log('Error while creating a new user: ' + err)
  }
}

const signIn = async (email, password) => {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password)
    const user = credential.user
    return user
  } catch (err) {
    console.log('Error while login in user: ' + err)
  }
}

export { createUser, signIn }
