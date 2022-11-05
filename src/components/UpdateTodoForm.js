import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateTodo } from '../redux/todos/todos.action'
import { synchronize } from '../redux/todos/todos.middleware'
import validation from '../utils/formValidation'
import Button from './Button'

function UpdateTodoForm({ message, todoIndex, status }) {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState(message)
  const userID = useSelector((state) => state.auth.currentUser.id)

  const handleAccept = (e) => {
    e.preventDefault()

    const validator = validation({
      message: inputValue,
    })

    const validationErrors = validator.validateForm()

    if (validationErrors.length === 0) {
      dispatch(updateTodo(inputValue, status, todoIndex))
      dispatch(synchronize(userID, [status]))
    } else {
      //TODO: show error
    }
  }

  const handleCancel = (e) => {
    e.preventDefault()
  }

  const handleClick = (e) => {
    e.stopPropagation()
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
        onClick={handleClick}
      />
      <Button text="Accept" onClickHandler={handleAccept} />
      <Button text="Cancel" onClickHandler={handleCancel} />
    </form>
  )
}

export default UpdateTodoForm
