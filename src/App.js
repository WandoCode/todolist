import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/Home'
import { getTodosMiddleware } from './redux/todos/todos.middleware'

function App() {
  const dispatch = useDispatch()

  dispatch(getTodosMiddleware())

  return (
    <div className="App">
      <Home />
    </div>
  )
}

export default App
