import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '../redux/theme/theme.actions'

import moon from '../assets/moon.svg'
import sun from '../assets/sun.svg'

function ThemeSwitch() {
  const dispatch = useDispatch()

  const currTheme = useSelector((state) => state.theme.theme)

  useEffect(() => {
    if (!currTheme) getAndSetDefaultTheme()
  }, [])

  const getAndSetDefaultTheme = () => {
    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)')

    dispatch(setTheme(darkThemeMq.matches ? 'dark' : 'light'))
  }

  const handleClick = () => {
    const newTheme = currTheme === 'light' ? 'dark' : 'light'
    dispatch(setTheme(newTheme))
  }

  return (
    <div className="theme-switch" onClick={handleClick}>
      <img className="theme-switch__icon" src={sun} alt="sun" />
      <img className="theme-switch__icon" src={moon} alt="moon" />
      <span
        className={`theme-switch__cursor theme-switch__cursor--${currTheme}`}
      ></span>
    </div>
  )
}

export default ThemeSwitch
