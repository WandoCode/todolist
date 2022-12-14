import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Router from './Router'

import setupLanguage from './redux/language/language.middlewares'
import './style/index.css'
import themeStore from './store/themeStore'
import { setTheme } from './redux/theme/theme.actions'

function App() {
  const dispatch = useDispatch()

  const theme = useSelector((state) => state.theme.theme)

  const userLanguage =
    window.navigator.userLanguage || window.navigator.language

  useEffect(() => {
    const defaultTheme = themeStore().getTheme()
    dispatch(setTheme(defaultTheme))
  }, [])

  useEffect(() => {
    const language = userLanguage.split('-')[0]
    dispatch(setupLanguage(language))
  }, [userLanguage])

  return (
    <div className="app" id={theme}>
      <Router />
    </div>
  )
}

export default App
