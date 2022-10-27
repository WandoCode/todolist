import { useSelector } from 'react-redux'
import { useEffect } from 'react'

function List() {
  const todos = useSelector((state) => state.todos.todos)

  const orderTodos = (todosArray) => {
    const arrayCopy = [...todosArray]

    arrayCopy.sort((a, b) => {
      if (a.archived > b.archived) return 1
      if (a.archived < b.archived) return -1
      if (a.priority < b.priority) return 1
      if (a.priority > b.priority) return -1
      if (a.order > b.order) return 1
      if (a.order < b.order) return -1
      return 0
    })

    return arrayCopy
  }

  const todosListDOM = (todosArray) => {
    const sortedTodos = orderTodos(todosArray)
    console.log(sortedTodos)
    const todosDOM = sortedTodos.map((todo) => {
      return <li key={todo.id}>{todo.message}</li>
    })

    const liDOM = []
    return <ul> {todosDOM}</ul>
  }

  return <div className="list">{todosListDOM(todos)}</div>
}

export default List
