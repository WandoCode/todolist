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

export { orderTodos }
