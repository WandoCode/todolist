function TodoItem({ todo }) {
  const buildItemClass = () => {
    let itemClass = 'todo-item '
    if (todo.archived) itemClass += 'archived'
    if (!todo.archived && todo.priority) itemClass += 'pinned'

    return itemClass
  }

  return (
    <li key={todo.id} className={buildItemClass()}>
      {todo.message}
    </li>
  )
}

export default TodoItem
