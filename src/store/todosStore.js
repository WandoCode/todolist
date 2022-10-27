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
import uniqid from 'uniqid'

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

const todoStore = (name) => {
  let currentTodos = []

  const getCurrentTodos = () => {
    return currentTodos
  }

  const getTodos = async () => {
    try {
      if (useMockDatas) {
        currentTodos = [...mockDatas.todos]
        return mockDatas.todos
      }
      const todosCol = collection(db, collectionName)
      const rep = await getDocs(todosCol)

      const todos = rep.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })

      currentTodos = todos
      return todos
    } catch (err) {
      console.error('Error retreiving todos: ', err)
    }
  }

  const getTodo = async (id) => {
    return currentTodos.find((el) => el.id === id)
  }

  const addTodo = async (todoObject) => {
    try {
      if (useMockDatas) {
        const newTodo = { id: uniqid(), ...todoObject }
        currentTodos.push(newTodo)
        return
      }

      const todosCol = collection(db, collectionName)
      const rep = await addDoc(todosCol, todoObject)

      currentTodos.push({ id: rep.id, ...todoObject })
    } catch (err) {
      console.error('Error adding todo: ', err)
    }
  }

  const delTodo = async (id) => {
    try {
      if (useMockDatas) {
        currentTodos = currentTodos.filter((el) => el.id !== id)
        return
      }

      const docRef = doc(db, collectionName, id)

      await deleteDoc(docRef)
    } catch (err) {
      console.error('Error erasing todos: ', err)
    }
  }

  const updateTodo = async (id, payload) => {
    try {
      if (useMockDatas) {
        currentTodos = currentTodos.map((el) => {
          if (el.id === id) {
            return { ...el, ...payload }
          } else return el
        })

        return
      }

      const docRef = doc(db, collectionName, id)
      await updateDoc(docRef, payload)
    } catch (err) {
      console.error('Error updating todos: ', err)
    }
  }

  return { addTodo, getTodo, getTodos, delTodo, updateTodo, getCurrentTodos }
}

export default todoStore
