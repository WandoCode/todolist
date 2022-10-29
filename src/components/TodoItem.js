import { useDispatch } from 'react-redux'
import { archiveItem, switchItems } from '../redux/todos/todos.action'
import { useState } from 'react'

function TodoItem({
  todo,
  tempOrder,
  onHandleDragStart,
  onHandleDrop,
  onHandleDragEnter,
  onHandleDragOver,
  onHandleDragLeave,
}) {
  const dispatch = useDispatch()

  const buildItemClass = () => {
    let itemClass = 'todo-item '
    if (todo.status === -1) itemClass += 'archived'
    if (todo.status === 1) itemClass += 'pinned'

    return itemClass
  }
  const handleDragStart = (e) => {
    onHandleDragStart(tempOrder)
  }

  const handleDrop = (e) => {
    onHandleDrop(tempOrder)
  }

  const handleDragEnter = (e) => {
    onHandleDragEnter(e)
  }

  const handleDragOver = (e) => {
    e.preventDefault() // Important for onDrop to work
    onHandleDragOver(e)
  }

  const handleDragLeave = (e) => {
    onHandleDragLeave(e)
  }

  const handleArchive = (e) => {
    dispatch(archiveItem(tempOrder))
  }
  const handlePin = (e) => {
    return
  }
  return (
    <li
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={buildItemClass()}
    >
      {todo.message}
      <div className="btns">
        <button onClick={handleArchive}>x</button>
        <button onClick={handlePin}>p</button>
      </div>
    </li>
  )
}

export default TodoItem
