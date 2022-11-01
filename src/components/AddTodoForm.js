import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { synchronize } from '../redux/todos/todos.middleware'
import { validateForm } from '../utils/formValidation'
import uniqid from 'uniqid'
import { addTodo, normalizeList } from '../redux/todos/todos.action'

function AddTodoForm() {
  const dispatch = useDispatch()
  const inputRef = useRef()
  const userID = useSelector((state) => state.auth.currentUser.id)

  const handleSubmit = (e) => {
    e.preventDefault()

    const formDatas = { message: inputRef.current.value }

    const formIsValid = validateForm(formDatas)

    if (formIsValid) {
      const newTodo = {
        message: formDatas.message,
        status: 0,
        creationDate: new Date().toString(),
        id: uniqid(),
      }
      dispatch(addTodo(newTodo))
      dispatch(normalizeList(0))
      dispatch(synchronize(userID, 0))
    }
  }

  return (
    <form action="" className="add-todo">
      <label htmlFor="new-todo" className="add-todo__label">
        Nouvelle tâche
      </label>
      <input
        type="text"
        name="new-todo"
        id="new-todo"
        className="add-todo__input"
        ref={inputRef}
      />
      <button type="submit" className="add-todo__sumbit" onClick={handleSubmit}>
        Ajouter
      </button>
    </form>
  )
}

export default AddTodoForm
