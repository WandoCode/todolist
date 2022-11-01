import app from './config'
import {
  getAuth,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'

const testWithLocalEnv = process.env.REACT_APP_LOCAL === 'true'

const auth = getAuth(app)

if (testWithLocalEnv) connectAuthEmulator(auth, 'http://localhost:9099')

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
