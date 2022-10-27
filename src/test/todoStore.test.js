import todoStore from '../store/todosStore'

import mocksTodos from '../mocks/todos.json'

if (process.env.REACT_APP_LOCAL === 'false') {
  afterEach(() => {
    // When using the firebase test collection: empty the collection for the next test
    console.log('test with firebase')
  })
}

let storeInstance
beforeEach(() => {
  storeInstance = todoStore()
  storeInstance.getTodos()
})

describe('Given I call the getTodos store function, then', () => {
  test('it should return all the todos datas', async () => {
    const todos = await storeInstance.getTodos()

    expect(todos).toEqual(mocksTodos.todos)
  })
})

describe('Given I call the getTodo store function with a given id, then', () => {
  test('it should return the correspondant todo object', async () => {
    const todo = await storeInstance.getTodo('1')

    const mocksTodo = mocksTodos.todos.find((el) => el.id === '1')
    expect(todo).toEqual(mocksTodo)
  })
})
