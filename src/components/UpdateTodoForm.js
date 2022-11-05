import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateTodo } from '../redux/todos/todos.action'
import { synchronize } from '../redux/todos/todos.middleware'
import validation from '../utils/formValidation'
import Button from './Button'

function UpdateTodoForm({ message, todoIndex, status, onCloseEdit }) {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState(message)
  const [showError, setShowError] = useState(false)
  const userID = useSelector((state) => state.auth.currentUser.id)

  const handleAccept = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log(e)
    const validator = validation({
      message: inputValue,
    })

    const validationErrors = validator.validateForm()

    if (validationErrors.length === 0) {
      setShowError(false)
      dispatch(updateTodo(inputValue, status, todoIndex))
      dispatch(synchronize(userID, [status]))
      onCloseEdit(false)
    } else {
      setShowError(true)
      return
    }
  }

  const handleCancel = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onCloseEdit(false)
  }

  const handleClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const inputClass = useMemo(
    () => (showError ? 'updateTodo__input--error' : 'updateTodo__input'),
    [showError]
  )

  return (
    <form className="updateTodo">
      <input
        type="text"
        name="message"
        id="message"
        className={inputClass}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onClick={handleClick}
      />
      {showError && (
        <div className="updateTodo__tooltip">You can't save an empty task!</div>
      )}
      <Button text="Accept" onClickHandler={handleAccept} />
      <Button text="Cancel" onClickHandler={handleCancel} />
    </form>
  )
}

export default UpdateTodoForm
