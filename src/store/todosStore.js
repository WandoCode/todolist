import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore/lite'

import todosMock from '../mocks/todos.json'

import app from './config'

// To test app locally
let useMockDatas = process.env.REACT_APP_LOCAL === 'true'

// To test app with a real firestore
let collectionName =
  process.env.REACT_APP_LOCAL === 'false' ? 'todosTest' : 'todos'

const db = getFirestore(app)

let mockDatas
if (useMockDatas) mockDatas = todosMock

const todoStore = () => {
  let currentTodos = []

  const addTodo = async (todoObject) => {
    try {
      if (useMockDatas) return

      const todosCol = collection(db, collectionName)
      await addDoc(todosCol, todoObject)
    } catch (err) {
      console.error('Error adding todo: ', err)
    }
  }

  const getTodo = async (id) => {
    return currentTodos.find((el) => el.id === id)
  }

  const getTodos = async () => {
    try {
      let todos
      if (useMockDatas) todos = mockDatas.todos
      else {
        const todosCol = collection(db, collectionName)
        const rep = await getDocs(todosCol)

        todos = rep.docs.map((doc) => {
          return { id: doc.id, ...doc.data() }
        })
      }
      currentTodos = todos

      return todos
    } catch (err) {
      console.error('Error retreiving todos: ', err)
    }
  }

  const delTodo = async (id) => {
    try {
      if (useMockDatas) return

      const docRef = doc(db, collectionName, id)

      await deleteDoc(docRef)
    } catch (err) {
      console.error('Error erasing todos: ', err)
    }
  }

  const updateTodo = async (id, payload) => {
    try {
      if (useMockDatas) return

      const docRef = doc(db, collectionName, id)
      await updateDoc(docRef, payload)
    } catch (err) {
      console.error('Error updating todos: ', err)
    }
  }

  return { addTodo, getTodo, getTodos, delTodo, updateTodo }
}

export default todoStore
