import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { synchronize } from '../redux/todos/todos.middleware'
import validation from '../utils/formValidation'
import uniqid from 'uniqid'
import { addTodo, normalizeList } from '../redux/todos/todos.action'
import Button from './Button'

function AddTodoForm() {
  const dispatch = useDispatch()
  const inputRef = useRef()
  const userID = useSelector((state) => state.auth.currentUser.id)

  const handleSubmit = (e) => {
    e.preventDefault()

    const message = inputRef.current.value

    const validator = validation({
      message,
    })

    const validationErrors = validator.validateForm()

    if (validationErrors.length === 0) {
      const newTodo = {
        message,
        status: 0,
        creationDate: new Date().toString(),
        id: uniqid(),
      }
      dispatch(addTodo(newTodo))
      dispatch(normalizeList(0))
      dispatch(synchronize(userID, [0]))
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
      <Button text="Ajouter" onClickHandler={handleSubmit} />
    </form>
  )
}

export default AddTodoForm
