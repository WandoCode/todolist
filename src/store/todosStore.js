import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  connectFirestoreEmulator,
} from 'firebase/firestore/lite'

import { getTodosListName } from '../utils/helpers'

import app from './config'

const testWithLocalEnv = process.env.REACT_APP_LOCAL === 'true'

let db

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
      //TODO: faire un message en fct du status http? (200ok, 404, etc)???
    }
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

  const saveCollection = async (newTodosArray, listName) => {
    try {
      // TODO: mettre l'id de l'utilisateur au lieu de 'todos'
      const todoDoc = doc(db, `todos/${listName}`)

      const documentDatas = {}
      documentDatas[listName] = newTodosArray

      await updateDoc(todoDoc, documentDatas)
    } catch (err) {
      console.error('Error saving changed todos: ', err)
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

  const updateTodo = async (modifiedTodoObject) => {
    try {
      const listName = getTodosListName(modifiedTodoObject.status)

      const currentTodos = await getTodos()

      const list = currentTodos.find((el) => el[listName])

      const oldTodoIndex = list[listName].findIndex(
        (el) => el.id === modifiedTodoObject.id
      )

      list[listName].splice(oldTodoIndex, 1, modifiedTodoObject)

      // TODO: mettre l'id de l'utilisateur au lieu de 'todos'
      const todoDoc = doc(db, `todos/${listName}`)

      await updateDoc(todoDoc, list)
    } catch (err) {
      console.error('Error updating todos: ', err)
    }
  }

  return {
    addTodo,
    getTodos,
    updateTodo,
    saveCollection,
    addCollection,
  }
}

export default todosStore
// TODO: nettoyer le code...
