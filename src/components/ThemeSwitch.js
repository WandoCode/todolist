import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setTheme } from '../redux/theme/theme.actions'

function ThemeSwitch() {
  const dispatch = useDispatch()
  const [nextTheme, setNextTheme] = useState()

  useEffect(() => {
    if (!nextTheme) {
      const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)')
      darkThemeMq.matches ? setNextTheme('dark') : setNextTheme('light')
    }

    dispatch(setTheme(nextTheme))
  }, [nextTheme])

  return (
    <div className="theme-switch">
      <label htmlFor="light-theme">
        <input
          type="radio"
          name="theme-switch"
          id="light-theme"
          value="light"
          checked={nextTheme === 'light'}
          onChange={(e) => setNextTheme(e.target.value)}
        />
        Light
      </label>
      <label htmlFor="dark-theme">
        <input
          type="radio"
          name="theme-switch"
          id="dark-theme"
          value="dark"
          checked={nextTheme === 'dark'}
          onChange={(e) => setNextTheme(e.target.value)}
        />
        Dark
      </label>
    </div>
  )
}

export default ThemeSwitch
