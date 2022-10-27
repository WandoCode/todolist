import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Todolist from './pages/Todolist'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={Todolist} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
