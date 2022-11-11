import { useEffect, useRef, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updateTodo } from '../redux/todos/todos.action'
import { synchronize } from '../redux/todos/todos.middleware'
import validation from '../utils/formValidation'

import Button from './Button'

function UpdateTodoForm({ message, todoIndex, status, onCloseEdit }) {
  const dispatch = useDispatch()
  const inputRef = useRef()

  const userID = useSelector((state) => state.auth.currentUser.id)
  const texts = useSelector((state) => state.language.texts?.homepage)

  const [inputValue, setInputValue] = useState(message)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleAccept = (e) => {
    e.preventDefault()
    e.stopPropagation()

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
    e.stopPropagation()

    onCloseEdit(false)
  }

  const handleClick = (e) => {
    e.stopPropagation()
  }

  const inputClass = useMemo(
    () =>
      showError
        ? 'updateTodo__input updateTodo__input--error'
        : 'updateTodo__input',
    [showError]
  )

  const handleBlur = (e) => {
    if (
      e.relatedTarget?.id !== 'btn-accept' &&
      e.relatedTarget?.id !== 'btn-cancel'
    )
      onCloseEdit(false)
  }

  return (
    <form className="updateTodo" onBlurCapture={handleBlur}>
      <input
        type="text"
        name="message"
        id="message"
        className={inputClass}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onClick={handleClick}
        ref={inputRef}
      />

      {showError && (
        <div className="updateTodo__tooltip">{texts?.errorAddTask}</div>
      )}

      <div className="updateTodo__btns">
        <Button
          type="accept"
          text={texts?.acceptUpdate}
          onClickHandler={handleAccept}
          classesArr={['inline', 'medium']}
          id="btn-accept"
        />
        <Button
          type="cancel"
          text={texts?.cancelUpdate}
          onClickHandler={handleCancel}
          classesArr={['inline', 'medium']}
          id="btn-cancel"
        />
      </div>
    </form>
  )
}

export default UpdateTodoForm
