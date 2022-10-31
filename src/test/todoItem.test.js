import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import TodoItem from '../components/TodoItem'
import store from '../redux/store'
import { toggleArchiveItem } from '../redux/todos/todos.action'

let todoObject = {
  id: '635ac8e210a160a76b8c6ade',
  author: 'Annabelle',
  creationDate:
    'Sun Aug 25 1957 10:47:15 GMT+0100 (heure d’été d’Europe centrale)',
  status: 0,
  message:
    'nulla exercitation aute sunt ipsum do ut exercitation ullamco in et incididunt',
  order: 5,
}

describe('When TodoItem is displayed', () => {
  it('then it should show the correct message', () => {
    render(
      <Provider store={store}>
        <TodoItem todo={todoObject} />
      </Provider>
    )

    const item = screen.getByText(todoObject.message)

    expect(item).toBeDefined()
  })
})

describe('When TodoItem is displayed for a todo item without priority', () => {
  let testObject
  beforeEach(() => {
    testObject = { ...todoObject, status: 0 }
  })
  it('Then an "archive" button should be present', () => {
    render(
      <Provider store={store}>
        <TodoItem todo={testObject} />
      </Provider>
    )
    const btnArchive = screen.getByRole('button', { name: 'Done' })
    expect(btnArchive).toBeDefined()

    expect(btnArchive).toBeDefined()
  })

  it('Then a "pin" button should be present', () => {
    render(
      <Provider store={store}>
        <TodoItem todo={testObject} />
      </Provider>
    )
    const btnPin = screen.getByRole('button', { name: 'Pin' })

    expect(btnPin).toBeDefined()
  })

  it('Then it should have the class "todo-item"', () => {
    render(
      <Provider store={store}>
        <TodoItem todo={testObject} />
      </Provider>
    )
    const item = screen.getByText(todoObject.message)

    const itemClass = item.classList

    expect(itemClass).toContain('todo-item')
  })
})

describe('When TodoItem is displayed for a pinned todo item', () => {
  let testObject
  beforeEach(() => {
    testObject = { ...todoObject, status: 1 }
  })
  it('Then an "Done" button should be present', () => {
    render(
      <Provider store={store}>
        <TodoItem todo={testObject} />
      </Provider>
    )
    const btnArchive = screen.getByRole('button', { name: 'Done' })

    expect(btnArchive).toBeDefined()
  })
  it('Then a "Unpin" button should be present', () => {
    render(
      <Provider store={store}>
        <TodoItem todo={testObject} />
      </Provider>
    )
    const btnPin = screen.getByRole('button', { name: 'Unpin' })

    expect(btnPin).toBeDefined()
  })

  it('Then it should have the class "todo-item" and "pinned"', () => {
    render(
      <Provider store={store}>
        <TodoItem todo={testObject} />
      </Provider>
    )
    const item = screen.getByText(todoObject.message)

    const itemClass = item.classList

    expect(itemClass).toContain('todo-item')
    expect(itemClass).toContain('pinned')
  })
})

describe('When TodoItem is displayed for an archived todo item', () => {
  let testObject
  beforeEach(() => {
    testObject = { ...todoObject, status: -1 }
  })
  it('Then an "Undone" button should be present', () => {
    render(
      <Provider store={store}>
        <TodoItem todo={testObject} />
      </Provider>
    )
    const btnArchive = screen.getByRole('button', { name: 'Undone' })

    expect(btnArchive).toBeDefined()
  })

  it('Then a "pin" button should be present', () => {
    render(
      <Provider store={store}>
        <TodoItem todo={testObject} />
      </Provider>
    )
    const btnPin = screen.getByRole('button', { name: 'Pin' })

    expect(btnPin).toBeDefined()
  })

  it('Then it should have the class "todo-item" and "archived"', () => {
    render(
      <Provider store={store}>
        <TodoItem todo={testObject} />
      </Provider>
    )
    const item = screen.getByText(todoObject.message)

    const itemClass = item.classList

    expect(itemClass).toContain('todo-item')
    expect(itemClass).toContain('archived')
  })
})
