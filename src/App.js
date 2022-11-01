import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/Home'
import { getTodosMiddleware } from './redux/todos/todos.middleware'
import Router from './Router'
import './style/index.css'
function App() {
  const dispatch = useDispatch()

  dispatch(getTodosMiddleware())

  return (
    <div className="App">
      <Router />
    </div>
  )
}

export default App
