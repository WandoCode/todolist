import { useEffect, useState } from 'react'
import TodoItem from './TodoItem'
import { useDispatch, useSelector } from 'react-redux'
import { switchItems } from '../redux/todos/todos.action'

function List() {
  const dispatch = useDispatch()
  const [draggedItem, setDraggedItem] = useState(0)
  const [droppedItem, setDroppedItem] = useState(0)
  const [itemListDOM, setItemListDOM] = useState([])
  const [doSwitchItems, setDoSwitchItems] = useState(false)
  const { todos, archive, pin } = useSelector((state) => state.todos)

  const handleDragStart = (elIndex, status) => {
    setDraggedItem({ index: elIndex, list: status })
  }

  const handleDrop = (elIndex, status) => {
    setDoSwitchItems(true)
    setDroppedItem({ index: elIndex, list: status })
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

  const makeItemListDOM = (todosArray) => {
    const todosDOM = todosArray.map((todo, index) => {
      return (
        <TodoItem
          todo={todo}
          key={todo.id}
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
    const allItemsDOM = [
      ...makeItemListDOM(pin),
      ...makeItemListDOM(todos),
      ...makeItemListDOM(archive),
    ]
    setItemListDOM(allItemsDOM)
  }, [todos, archive, pin])

  useEffect(() => {
    if (!doSwitchItems) return
    if (todos.length === 0) return

    if (draggedItem.status === droppedItem.status) {
      dispatch(
        switchItems(draggedItem.index, droppedItem.index, draggedItem.list)
      )
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
