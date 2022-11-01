import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDC7E41AV85BRZvA47qpT7uReLH0oMw5K0',
  authDomain: 'todolist-4ee38.firebaseapp.com',
  projectId: 'todolist-4ee38',
  storageBucket: 'todolist-4ee38.appspot.com',
  messagingSenderId: '997246066157',
  appId: '1:997246066157:web:3b08e3fa6d5ad8d183dbe4',
  measurementId: 'G-C4EMDQHMKM',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const testWithLocalEnv = process.env.REACT_APP_LOCAL === 'true'
if (testWithLocalEnv) {
  console.warn(
    '!! You are in a local development environement, be sure to have launched firebase emulators to continue !! (firebase emulators:start)'
  )

  connectAuthEmulator(auth, 'http://localhost:9099')
  connectFirestoreEmulator(db, 'localhost', 8080)
}

export { app, auth, db }
