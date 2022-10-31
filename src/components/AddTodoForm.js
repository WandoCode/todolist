import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addTodoMiddleware } from '../redux/todos/todos.middleware'
import { validateForm } from '../utils/formValidation'

function AddTodoForm() {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()

    const formDatas = new FormData()
    formDatas.append('message', inputValue)

    const formIsValid = validateForm(formDatas)

    if (formIsValid) {
      const newTodo = { message: formDatas.get('message') }
      dispatch(addTodoMiddleware(newTodo))
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
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" className="add-todo__sumbit" onClick={handleSubmit}>
        Ajouter
      </button>
    </form>
  )
}

export default AddTodoForm
