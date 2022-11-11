import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TodoItem from './TodoItem'
import { normalizeList, switchItems } from '../redux/todos/todos.action'
import { synchronize } from '../redux/todos/todos.middleware'

function List() {
  const dispatch = useDispatch()

  const { todos, archive, pin } = useSelector((state) => state.todos)
  const userID = useSelector((state) => state.auth.currentUser.id)

  const [draggedItem, setDraggedItem] = useState({ index: null, list: null })
  const [droppedItem, setDroppedItem] = useState({ index: null, list: null })

  useEffect(() => {
    if (draggedItem.index === null || droppedItem.index === null) return
    if (
      draggedItem.index === droppedItem.index &&
      draggedItem.list === droppedItem.list
    )
      return

    doSwitchItem()
  }, [droppedItem])

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

  const doSwitchItem = () => {
    dispatch(
      switchItems(
        draggedItem.index,
        droppedItem.index,
        draggedItem.list,
        droppedItem.list
      )
    )

    if (droppedItem.list === draggedItem.list) {
      dispatch(normalizeList(draggedItem.list))
      dispatch(synchronize(userID, [draggedItem.list]))
    } else {
      dispatch(normalizeList(draggedItem.list))
      dispatch(normalizeList(droppedItem.list))
      dispatch(synchronize(userID, [draggedItem.list, droppedItem.list]))
    }
  }

  return (
    <article className="list">
      <ul className="list__container">{itemListDOM}</ul>
    </article>
  )
}

export default List
