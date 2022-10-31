import { useEffect, useState } from 'react'
import TodoItem from './TodoItem'
import { useDispatch, useSelector } from 'react-redux'
import { normalizeList, switchItems } from '../redux/todos/todos.action'
import AddTodoForm from './AddTodoForm'
import { synchronize } from '../redux/todos/todos.middleware'

function List() {
  const dispatch = useDispatch()
  const [draggedItem, setDraggedItem] = useState({ index: null, list: null })
  const [droppedItem, setDroppedItem] = useState({ index: null, list: null })
  const [itemListDOM, setItemListDOM] = useState([])

  const { todos, archive, pin } = useSelector((state) => state.todos)

  const handleDragStart = (elIndex, status) => {
    setDraggedItem({ index: elIndex, list: status })
  }

  const handleDrop = (elIndex, status) => {
    setDroppedItem({ index: elIndex, list: status })
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
    if (draggedItem.index === null || droppedItem.index === null) return
    if (todos.length === 0) return

    if (draggedItem.list === droppedItem.list) {
      dispatch(
        switchItems(draggedItem.index, droppedItem.index, draggedItem.list)
      )
      dispatch(normalizeList(draggedItem.list))
      dispatch(synchronize([draggedItem.list]))
    }
  }, [droppedItem])

  return (
    <div className="list">
      <ul>{itemListDOM}</ul>
      <AddTodoForm />
    </div>
  )
}

export default List
