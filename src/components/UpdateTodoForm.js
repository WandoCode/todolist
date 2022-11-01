import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateTodo } from '../redux/todos/todos.action'
import { synchronize } from '../redux/todos/todos.middleware'

function UpdateTodoForm({ message, todoIndex, status }) {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState(message)
  const userID = useSelector((state) => state.auth.currentUser.id)
  const handleAccept = (e) => {
    e.preventDefault()
    e.stopPropagation()
    //TODO: valider le formulaire
    dispatch(updateTodo(inputValue, status, todoIndex))
    dispatch(synchronize(userID, status))
  }

  const handleCancel = (e) => {
    e.preventDefault()
  }

  return (
    <form action="">
      <input
        type="text"
        name="message"
        id="message"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAccept}>Accept</button>
      <button onClick={handleCancel}>Cancel</button>
    </form>
  )
}

export default UpdateTodoForm
