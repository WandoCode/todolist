import { useSelector } from 'react-redux'
import ThemeSwitch from './components/ThemeSwitch'
import Router from './Router'
import './style/index.css'

function App() {
  const theme = useSelector((state) => state.theme.theme)

  return (
    <div className="App" id={theme}>
      <ThemeSwitch />
      <main className="main">
        <Router />
      </main>
    </div>
  )
}

export default App
