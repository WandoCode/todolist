import { useDispatch, useSelector } from 'react-redux'
import {
  delTodo,
  toggleArchiveItem,
  togglePinItem,
} from '../redux/todos/todos.action'
import { synchronize } from '../redux/todos/todos.middleware'
import { useState } from 'react'
import UpdateTodoForm from './UpdateTodoForm'

function TodoItem({ todo, tempOrder, onHandleDragStart, onHandleDrop }) {
  const dispatch = useDispatch()
  const userID = useSelector((state) => state.auth.currentUser.id)
  const [editMessage, setEditMessage] = useState(false)

  const buildItemClass = () => {
    let itemClass = 'todo-item '
    if (todo.status === -1) itemClass += 'archived'
    if (todo.status === 1) itemClass += 'pinned'

    return itemClass
  }

  const handleDragStart = (e) => {
    onHandleDragStart(tempOrder, todo.status)
  }

  const handleDrop = () => {
    onHandleDrop(tempOrder, todo.status)
  }

  const handleDragOver = (e) => {
    e.preventDefault() // Important for onDrop to work
  }

  const handleToggleArchive = (e) => {
    e.stopPropagation()

    dispatch(toggleArchiveItem(tempOrder, todo.status))
    dispatch(synchronize(userID))
  }

  const handleTogglePin = (e) => {
    e.stopPropagation()

    dispatch(togglePinItem(tempOrder, todo.status))
    dispatch(synchronize(userID))
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    dispatch(delTodo(tempOrder, todo.status))
    dispatch(synchronize(userID, [todo.status]))
  }

  const handleClick = (e) => {
    setEditMessage(editMessage ? false : true)
  }

  return (
    <li
      draggable={editMessage ? false : true}
      onDragStartCapture={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={buildItemClass()}
      onClick={handleClick}
    >
      {editMessage ? (
        <UpdateTodoForm
          message={todo.message}
          todoIndex={tempOrder}
          status={todo.status}
        />
      ) : (
        <>
          {todo.message}
          <div className="btns">
            <button onClick={handleToggleArchive}>
              {todo.status !== -1 ? 'Done' : 'Undone'}
            </button>
            <button onClick={handleTogglePin}>
              {todo.status !== 1 ? 'Pin' : 'Unpin'}
            </button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </li>
  )
}

export default TodoItem
