import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  connectFirestoreEmulator,
} from 'firebase/firestore/lite'

import uniqid from 'uniqid'

import app from './config'

// To test app with a real firestore
let collectionName = 'todos'

const testWithLocalEnv = process.env.REACT_APP_LOCAL === 'true'

let db
// Use the development environement
// !!!! The firestore emulator have to run: 'firebase emulators:start' !!!!
if (testWithLocalEnv) {
  console.warn(
    '!! You are in a local development environement, be sure to have launch firebase emulators to continue !! (firebase emulators:start)'
  )
  db = getFirestore()
  connectFirestoreEmulator(db, 'localhost', 8080)
} else {
  db = getFirestore(app)
}

const todosStore = (userID) => {
  const getTodos = async () => {
    try {
      const todosCol = collection(db, collectionName)
      const rep = await getDocs(todosCol)

      const todos = rep.docs.map((doc) => {
        return { ...doc.data() }
      })

      console.log(todos)
      return todos
    } catch (err) {
      console.error('Error retreiving todos: ', err)
    }
  }

  const getTodo = async (id) => {
    return
  }

  const addTodo = async (todoObject) => {
    try {
      let id = todoObject.id
      if (!id) id = uniqid()
      const todoDoc = doc(db, collectionName, id)

      const addedTodo = { ...todoObject, id }

      await setDoc(todoDoc, addedTodo)

      return addedTodo
    } catch (err) {
      console.error('Error adding todo: ', err)
    }
  }

  const delTodo = async (id) => {
    try {
      const docRef = doc(db, collectionName, id)

      await deleteDoc(docRef)
    } catch (err) {
      console.error('Error erasing todo: ', err)
    }
  }

  const updateTodo = async (id, payload) => {
    try {
      const docRef = doc(db, collectionName, id)
      await updateDoc(docRef, payload)
    } catch (err) {
      console.error('Error updating todos: ', err)
    }
  }

  const saveAll = async (todosArray) => {
    try {
      await todosArray.forEach(async (todo) => {
        await updateTodo(todo.id, todo)
      })
    } catch (err) {
      console.error('Error saving changed todos: ', err)
    }
  }

  return {
    addTodo,
    getTodo,
    getTodos,
    delTodo,
    updateTodo,
    saveAll,
  }
}

export default todosStore
