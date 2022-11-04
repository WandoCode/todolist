import { useState } from 'react'

function ThemeSwitch() {
  const [nextTheme, setNextTheme] = useState('dark')

  const clickHandler = (e) => {
    setNextTheme(nextTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <button className="theme-switch" onClick={clickHandler}>
      {nextTheme}
    </button>
  )
}

export default ThemeSwitch
