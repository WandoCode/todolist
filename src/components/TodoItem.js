import { useDispatch } from 'react-redux'
import { toggleArchiveItem, togglePinItem } from '../redux/todos/todos.action'
import { delTodoMiddleware, synchronize } from '../redux/todos/todos.middleware'

function TodoItem({ todo, tempOrder, onHandleDragStart, onHandleDrop }) {
  const dispatch = useDispatch()

  const buildItemClass = () => {
    let itemClass = 'todo-item '
    if (todo.status === -1) itemClass += 'archived'
    if (todo.status === 1) itemClass += 'pinned'

    return itemClass
  }

  const handleDragStart = () => {
    onHandleDragStart(tempOrder, todo.status)
  }

  const handleDrop = () => {
    onHandleDrop(tempOrder, todo.status)
  }

  const handleDragOver = (e) => {
    e.preventDefault() // Important for onDrop to work
  }

  const handleToggleArchive = () => {
    dispatch(toggleArchiveItem(tempOrder, todo.status))
    dispatch(synchronize())
  }

  const handleTogglePin = () => {
    dispatch(togglePinItem(tempOrder, todo.status))
    dispatch(synchronize())
  }

  const handleDelete = () => {
    dispatch(delTodoMiddleware(todo.id, tempOrder, todo.status))
  }

  return (
    <li
      draggable="true"
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={buildItemClass()}
    >
      {todo.message}" order: "{todo.order}
      <div className="btns">
        <button onClick={handleToggleArchive}>
          {todo.status !== -1 ? 'Done' : 'Undone'}
        </button>
        <button onClick={handleTogglePin}>
          {todo.status !== 1 ? 'Pin' : 'Unpin'}
        </button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </li>
  )
}

export default TodoItem
