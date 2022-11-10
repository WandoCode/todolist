import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import setupLanguage from './redux/language/language.middlewares'
import Router from './Router'
import './style/index.css'

function App() {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme.theme)
  const userLanguage =
    window.navigator.userLanguage || window.navigator.language

  useEffect(() => {
    dispatch(setupLanguage(userLanguage.split('-')[0]))
  }, [userLanguage])

  return (
    <div className="app" id={theme}>
      <Router />
    </div>
  )
}

export default App
