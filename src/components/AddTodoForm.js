import { useMemo, useRef, useState } from 'react'
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
    const texts = useSelector((state) => state.language.texts?.homepage)

    const [showError, setShowError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        const message = inputRef.current.value

        const validator = validation({ message })

        const validationErrors = validator.validateForm()

        if (validationErrors.length === 0) {
            setShowError(false)

            inputRef.current.value = ''

            createAndAddTodo(message)
        } else {
            setShowError(true)

            setTimeout(() => setShowError(false), 2000)
        }
    }

    const createAndAddTodo = (message) => {
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

    const inputClass = useMemo(() => {
        return showError
            ? 'add-todo__input add-todo__input--error'
            : ' add-todo__input'
    }, [showError])

    const formClass = useMemo(() => {
        return showError ? 'add-todo add-todo--tooltip' : 'add-todo'
    }, [showError])

    return (
        <form className={formClass} data-tooltip={texts?.errorAddTask}>
            <label htmlFor="new-todo" className="add-todo__label">
                {texts?.newTask}
            </label>
            <input
                type="text"
                name="new-todo"
                id="new-todo"
                className={inputClass}
                ref={inputRef}
            />

            <Button
                text={texts?.addTask}
                onClickHandler={handleSubmit}
                classesArr={['new-todo', 'main']}
            />
        </form>
    )
}

export default AddTodoForm
