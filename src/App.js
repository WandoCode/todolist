import { useSelector } from 'react-redux'
import Router from './Router'
import './style/index.css'

function App() {
  const theme = useSelector((state) => state.theme.theme)

  return (
    <div className="app" id={theme}>
      <Router />
    </div>
  )
}

export default App
