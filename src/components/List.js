import { useEffect, useMemo, useState } from 'react'
import TodoItem from './TodoItem'
import { useDispatch, useSelector } from 'react-redux'
import { normalizeList, switchItems } from '../redux/todos/todos.action'
import AddTodoForm from './AddTodoForm'
import { synchronize } from '../redux/todos/todos.middleware'

function List() {
  const dispatch = useDispatch()
  const [draggedItem, setDraggedItem] = useState({ index: null, list: null })
  const [droppedItem, setDroppedItem] = useState({ index: null, list: null })

  const { todos, archive, pin } = useSelector((state) => state.todos)
  const userID = useSelector((state) => state.auth.currentUser.id)

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

  const itemListDOM = useMemo(() => {
    const allItemsDOM = [
      ...makeItemListDOM(pin),
      ...makeItemListDOM(todos),
      ...makeItemListDOM(archive),
    ]
    return allItemsDOM
  }, [todos, archive, pin])

  useEffect(() => {
    if (draggedItem.index === null || droppedItem.index === null) return
    if (draggedItem.list !== droppedItem.list) return
    if (draggedItem.index === droppedItem.index) return

    dispatch(
      switchItems(draggedItem.index, droppedItem.index, draggedItem.list)
    )
    dispatch(normalizeList(draggedItem.list))
    dispatch(synchronize(userID, [draggedItem.list]))
  }, [droppedItem])

  return (
    <article className="list">
      <ul className="list__container">{itemListDOM}</ul>
      <AddTodoForm />
    </article>
  )
}

export default List
