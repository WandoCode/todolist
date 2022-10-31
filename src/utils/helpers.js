const orderTodos = (todosArray) => {
  const arrayCopy = [...todosArray]

  arrayCopy.sort((a, b) => {
    if (a.order > b.order) return 1
    if (a.order < b.order) return -1

    return 0
  })

  return arrayCopy
}

const normalizeOrder = (todosArray) => {
  const arrayCopy = [...todosArray]
  const a = arrayCopy.map((el, index) => {
    return { ...el, order: index }
  })
  console.log(a)
  return a
}

const getTodosListName = (status) => {
  const listSelector = status
  const listChoice = { 1: 'pin', 0: 'todos', '-1': 'archive' }
  const list = listChoice[listSelector]

  return list
}

export { orderTodos, getTodosListName, normalizeOrder }
