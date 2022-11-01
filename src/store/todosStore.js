import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
} from 'firebase/firestore/lite'

import { getTodosListName } from '../utils/helpers'

import { db } from './firebase.config'

const todosStore = () => {
  const getTodos = async (userID) => {
    try {
      const todosCol = collection(db, `${userID}`)
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

  const addCollection = async (listName, datas, userID) => {
    try {
      const todoDoc = doc(db, `${userID}/${listName}`)

      const documentDatas = {}
      documentDatas[listName] = datas

      await setDoc(todoDoc, documentDatas)
    } catch (err) {
      console.error('Error creating collection: ', err)
    }
  }

  const saveCollection = async (newTodosArray, listName, userID) => {
    try {
      const todoDoc = doc(db, `${userID}/${listName}`)

      const documentDatas = {}
      documentDatas[listName] = newTodosArray

      await updateDoc(todoDoc, documentDatas)
    } catch (err) {
      console.error('Error saving changed todos: ', err)
    }
  }

  const addTodo = async (todoObject, userID) => {
    try {
      const listName = getTodosListName(todoObject.status)

      const currentTodos = await getTodos()

      const list = currentTodos.find((el) => el[listName])

      list[listName].push(todoObject)

      const todoDoc = doc(db, `${userID}/${listName}`)

      await updateDoc(todoDoc, list)
    } catch (err) {
      console.error('Error adding todo: ', err)
    }
  }

  const updateTodo = async (modifiedTodoObject, userID) => {
    try {
      const listName = getTodosListName(modifiedTodoObject.status)

      const currentTodos = await getTodos()

      const list = currentTodos.find((el) => el[listName])

      const oldTodoIndex = list[listName].findIndex(
        (el) => el.id === modifiedTodoObject.id
      )

      list[listName].splice(oldTodoIndex, 1, modifiedTodoObject)

      const todoDoc = doc(db, `${userID}/${listName}`)

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
