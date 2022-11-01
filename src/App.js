import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/Home'

import Router from './Router'
import './style/index.css'
function App() {
  return (
    <div className="App">
      <Router />
    </div>
  )
}

export default App
