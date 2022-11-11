import { useDispatch, useSelector } from 'react-redux'
import { useState, useMemo } from 'react'

import trashIcone from '../assets/trash.svg'
import archiveIcone from '../assets/archive.svg'
import normalIcone from '../assets/normal.svg'
import pinIcone from '../assets/pin.svg'

import {
  delTodo,
  toggleArchiveItem,
  togglePinItem,
} from '../redux/todos/todos.action'
import { synchronize } from '../redux/todos/todos.middleware'

import UpdateTodoForm from './UpdateTodoForm'
import Button from './Button'

function TodoItem({ todo, tempOrder, onHandleDragStart, onHandleDrop }) {
  const dispatch = useDispatch()

  const userID = useSelector((state) => state.auth.currentUser.id)
  const texts = useSelector((state) => state.language.texts?.homepage)

  const [editMessage, setEditMessage] = useState(false)
  const [hovered, setHovered] = useState(0)
  const [dragged, setDragged] = useState(false)

  const hoveredItemClass = useMemo(() => {
    let itemClass = 'todo-item'

    if (hovered === 1) itemClass += ' todo-item--hover'

    return itemClass
  }, [hovered])

  const draggedItemClass = useMemo(() => {
    let itemClass = 'todo-item'

    if (dragged) itemClass += ' todo-item--dragged'

    return itemClass
  }, [dragged])

  const containerClassName = useMemo(() => {
    let itemClass = 'todo-item__container'

    if (todo.status === -1) itemClass += ' todo-item__container--archived'
    if (todo.status === 1) itemClass += ' todo-item__container--pinned'

    return itemClass
  }, [todo.status])

  const handleDragStart = () => {
    setDragged(true)
    onHandleDragStart(tempOrder, todo.status)
  }
  const handleDragEnd = () => {
    setDragged(false)
  }

  const handleDrop = () => {
    setHovered(0)
    onHandleDrop(tempOrder, todo.status)
  }

  const handleDragOver = (e) => {
    e.preventDefault() // Important for onDrop to work
    e.stopPropagation()
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

  const handleClick = () => {
    setEditMessage(editMessage ? false : true)
  }

  const handleDragEnter = () => {
    setHovered((prev) => prev + 1)
  }

  const handleDragLeave = () => {
    setHovered((prev) => prev - 1)
  }

  return (
    <li
      draggable={editMessage ? false : true}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
      className={dragged ? draggedItemClass : hoveredItemClass}
      onClick={handleClick}
    >
      <div className={containerClassName}>
        {editMessage ? (
          <UpdateTodoForm
            message={todo.message}
            todoIndex={tempOrder}
            status={todo.status}
            onCloseEdit={setEditMessage}
          />
        ) : (
          <>
            <div className="todo-item__text">{todo.message}</div>

            <div className="todo-item__btns">
              <Button
                image={todo.status !== 1 ? pinIcone : normalIcone}
                text=""
                onClickHandler={handleTogglePin}
                tooltipText={
                  todo.status !== 1 ? texts?.priority : texts?.normal
                }
                classesArr={['inline', 'small']}
              />

              <Button
                image={todo.status !== -1 ? archiveIcone : normalIcone}
                text=""
                onClickHandler={handleToggleArchive}
                tooltipText={
                  todo.status !== -1 ? texts?.archive : texts?.normal
                }
                classesArr={['inline', 'small']}
              />

              <Button
                image={trashIcone}
                text=""
                onClickHandler={handleDelete}
                tooltipText={texts?.delete}
                classesArr={['inline', 'small']}
              />
            </div>
          </>
        )}
      </div>
    </li>
  )
}

export default TodoItem
