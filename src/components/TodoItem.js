import { useDispatch } from 'react-redux'
import { switchItems } from '../redux/todos/todos.action'
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
  const buildItemClass = () => {
    let itemClass = 'todo-item '
    if (todo.status === -1) itemClass += 'archived'
    if (todo.status === 1) itemClass += 'pinned'

    return itemClass
  }
  const handleDragStart = (e) => {
    onHandleDragStart(e)
  }

  const handleDrop = (e) => {
    onHandleDrop(e)
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

  return (
    <li
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={buildItemClass()}
      data-order={tempOrder}
    >
      {todo.message}
    </li>
  )
}

export default TodoItem
