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
import { getTodosListName } from '../utils/helpers'

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

const todosStore = () => {
  const getTodos = async () => {
    try {
      const todosCol = collection(db, `todos`)
      const rep = await getDocs(todosCol)

      const todos = rep.docs.map((doc) => {
        return { ...doc.data() }
      })
      return todos
    } catch (err) {
      console.error('Error retreiving todos: ', err)
    }
  }

  const getTodo = async (id) => {
    return
  }

  const addCollection = async (listName, datas) => {
    try {
      // TODO: mettre l'id de l'utilisateur au lieu de 'todos'
      const todoDoc = doc(db, `todos/${listName}`)

      const documentDatas = {}
      documentDatas[listName] = datas

      await setDoc(todoDoc, documentDatas)
    } catch (err) {
      console.error('Error creating collection: ', err)
    }
  }

  const addTodo = async (todoObject) => {
    try {
      const listName = getTodosListName(todoObject.status)

      const currentTodos = await getTodos()

      const list = currentTodos.find((el) => el[listName])

      list[listName].push(todoObject)

      // TODO: mettre l'id de l'utilisateur au lieu de 'todos'
      const todoDoc = doc(db, `todos/${listName}`)

      await updateDoc(todoDoc, list)
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

  const updateTodo = async (modifiedTodoObject) => {
    try {
      const listName = getTodosListName(modifiedTodoObject.status)

      const currentTodos = await getTodos()

      const list = currentTodos.find((el) => el[listName])

      const oldTodoIndex = list[listName].findIndex(
        (el) => el.id === modifiedTodoObject.id
      )
      console.log(list[listName])

      list[listName].splice(oldTodoIndex, 1, modifiedTodoObject)
      console.log(list[listName])
      // TODO: mettre l'id de l'utilisateur au lieu de 'todos'
      const todoDoc = doc(db, `todos/${listName}`)

      await updateDoc(todoDoc, list)
    } catch (err) {
      console.error('Error updating todos: ', err)
    }
  }

  const saveAllCollection = async (newTodosArray, status) => {
    try {
      const listName = getTodosListName(status)

      // TODO: mettre l'id de l'utilisateur au lieu de 'todos'
      const todoDoc = doc(db, `todos/${listName}`)

      const documentDatas = {}
      documentDatas[listName] = newTodosArray

      console.log(documentDatas)
      await updateDoc(todoDoc, documentDatas)
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
    saveAllCollection,
    addCollection,
  }
}

export default todosStore
