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

import app from './config'

const db = getFirestore(app)

const addTodo = async (todoObject) => {
  const todosCol = collection(db, 'todos')
  try {
    await addDoc(todosCol, todoObject)
  } catch (err) {
    console.error('Error adding todo: ', err)
  }
}

const getTodo = async (id) => {
  try {
    const docRef = doc(db, 'todos', id)
    const todo = await getDoc(docRef)
    return todo.data()
  } catch (err) {
    console.error('Error retreiving todo: ', err)
  }
}

const getTodos = async () => {
  try {
    const todosCol = collection(db, 'todos')
    const rep = await getDocs(todosCol)

    const todos = rep.docs.map((doc) => {
      return { id: doc.id, ...doc.data() }
    })

    return todos
  } catch (err) {
    console.error('Error retreiving todos: ', err)
  }
}

const delTodo = async (id) => {
  try {
    const docRef = doc(db, 'todos', id)

    await deleteDoc(docRef)
  } catch (err) {
    console.error('Error erasing todos: ', err)
  }
}

const updateTodo = async (id, payload) => {
  try {
    const docRef = doc(db, 'todos', id)
    await updateDoc(docRef, payload)
  } catch (err) {
    console.error('Error updating todos: ', err)
  }
}

export { addTodo, getTodo, getTodos, delTodo, updateTodo }
