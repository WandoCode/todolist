import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore/lite'

import app from './config'

// To test app with a real firestore
let collectionName =
  process.env.REACT_APP_LOCAL === 'false' ? 'todosTest' : 'todos'

const db = getFirestore(app)

const todosStore = (name) => {
  const getTodos = async () => {
    try {
      const todosCol = collection(db, collectionName)
      const rep = await getDocs(todosCol)

      const todos = rep.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })

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
      const todosCol = collection(db, collectionName)
      const rep = await addDoc(todosCol, todoObject)

      const addedTodo = { id: rep.id, ...todoObject }

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
      console.error('Error erasing todos: ', err)
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
