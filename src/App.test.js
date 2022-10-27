import { render, screen } from '@testing-library/react'
import App from './App'
import { addTodo } from './store/todosStore'

test('renders learn react link', async () => {
  render(<App />)
})
