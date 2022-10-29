import todosStore from '../store/todosStore'

import mocksTodos from '../mocks/todos.json'

const testingFirebase = process.env.REACT_APP_LOCAL === 'false'
if (testingFirebase) {
  afterEach(() => {
    // When using the firebase test collection: empty the collection for the next test
    // Populate the DB with test datas (coming from mock for ex.)
    // => IDs will be wrong! Have to change that
    console.log('test with firebase')
  })
}

let storeInstance
beforeEach(async () => {
  storeInstance = todosStore()
  await storeInstance.getTodos()

  return
})

describe('Given I call the getTodos store function, then', () => {
  test('it should return all the todos datas', async () => {
    const otherStoreInstance = todosStore()
    const todos = await otherStoreInstance.getTodos()

    expect(todos).toEqual(mocksTodos.todos)
  })

  test('todos should be available in currentTodos inner variable calling getCurrentTodos', async () => {
    const todos = storeInstance.getCurrentTodos()

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

describe('Given I call the addTodo store function with correct object, then', () => {
  test('it should be inserted into the local store', async () => {
    const newTodo = { id: '100000' }

    await storeInstance.addTodo(newTodo)

    const todos = storeInstance.getCurrentTodos()

    const todo = todos.find((el) => el.id === newTodo.id)

    expect(todo).toEqual(newTodo)
  })

  if (testingFirebase)
    test('it should be added to the DB', async () => {
      const newTodo = { id: '100000' }

      await storeInstance.addTodo(newTodo)

      const updatedTodos = await storeInstance.getTodos()

      const todo = updatedTodos.find((el) => el.id === newTodo.id)
      expect(todo).toEqual(newTodo)
    })
})

describe('Given I call the delTodo store function with correct id, then', () => {
  test('it should remove the linked object from the local store', async () => {
    const testID = '635ac8e2fd34ccb3c78ad8fb'
    await storeInstance.delTodo(testID)

    const todos = storeInstance.getCurrentTodos()

    const todo = todos.find((el) => el.id === testID)

    expect(todo).toBeUndefined()
  })

  if (testingFirebase)
    test('it should remove the linked object from the DB', async () => {
      const testID = '635ac8e2fd34ccb3c78ad8fb'
      await storeInstance.delTodo(testID)

      const updatedTodos = await storeInstance.getTodos()

      const todo = updatedTodos.find((el) => el.id === testID)
      expect(todo).toBeUndefined()
    })
})

describe('Given I call the updateTodo store function with correct id and datas, then', () => {
  test('it should update the linked object in the local store', async () => {
    const testID = '635ac8e2fd34ccb3c78ad8fb'
    const datas = { name: 'Max' }

    await storeInstance.updateTodo(testID, datas)

    const todos = storeInstance.getCurrentTodos()

    const todo = todos.find((el) => el.id === testID)
    const updatedTodo = mocksTodos.todos.find((el) => el.id === testID)

    expect(todo).toEqual({ ...updatedTodo, ...datas })
  })

  if (testingFirebase)
    test('it should update the linked object in the DB', async () => {
      const testID = '635ac8e2fd34ccb3c78ad8fb'
      const datas = { test: 'test', donne: 'a' }

      await storeInstance.updateTodo(testID, datas)

      const updatedTodos = await storeInstance.getTodos()

      const todo = updatedTodos.find((el) => el.id === testID)
      // expect(todo).toEqual()
    })
})

// TODO: au chargement des mock: les mettre sur le localStorage si pas encore presentes
// TODO: Ensuite, dans tout les cas, charger le localstorage dans redux.
// TODO: Faire les changements sur le localstorage comme je les ferai sur firestore
