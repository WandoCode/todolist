import { useEffect, useState } from 'react'
import TodoItem from './TodoItem'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { switchItems } from '../redux/todos/todos.action'

function List() {
  const dispatch = useDispatch()
  const [draggedItem, setDraggedItem] = useState(0)
  const [droppedItem, setDroppedItem] = useState(0)
  const [itemListDOM, setItemListDOM] = useState([])
  const [doSwitchItems, setDoSwitchItems] = useState(false)
  const todos = useSelector((state) => state.todos.todos, shallowEqual)

  const orderTodos = (todosArray) => {
    const arrayCopy = [...todosArray]

    arrayCopy.sort((a, b) => {
      if (a.status < b.status) return 1
      if (a.status > b.status) return -1
      if (a.order > b.order) return 1
      if (a.order < b.order) return -1

      return 0
    })

    return arrayCopy
  }

  const handleDragStart = (e) => {
    const element = e.target
    const elementOrder = parseInt(element.getAttribute('data-order'))
    setDraggedItem(elementOrder)
  }

  const handleDrop = (e) => {
    const element = e.target
    const elementOrder = parseInt(element.getAttribute('data-order'))
    setDoSwitchItems(true)
    setDroppedItem(elementOrder)
  }

  const handleDragEnter = () => {
    return
  }

  const handleDragOver = (e) => {
    return
  }

  const handleDragLeave = () => {
    return
  }
  const todosListDOM = (todosArray) => {
    const todosDOM = todosArray.map((todo, index) => {
      return (
        <TodoItem
          todo={todo}
          key={todo.order}
          tempOrder={index}
          onHandleDragStart={handleDragStart}
          onHandleDrop={handleDrop}
          onHandleDragEnter={handleDragEnter}
          onHandleDragOver={handleDragOver}
          onHandleDragLeave={handleDragLeave}
        />
      )
    })

    return todosDOM
  }

  useEffect(() => {
    setItemListDOM(todosListDOM(todos))
  }, [todos])

  useEffect(() => {
    if (!doSwitchItems) return
    if (todos.length === 0) return

    const itemA = todos[draggedItem]
    const itemB = todos[droppedItem]

    if (itemA.status === itemB.status) {
      dispatch(switchItems(draggedItem, droppedItem))
    }

    setDoSwitchItems(false)
  }, [doSwitchItems])

  return (
    <div className="list">
      <ul>{itemListDOM}</ul>
    </div>
  )
}

export default List
