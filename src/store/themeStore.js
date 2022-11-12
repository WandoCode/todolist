function themeStore() {
  const darkThemeActiveByDefault = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  const getTheme = () => {
    if (localStorage.getItem('todo-theme'))
      return localStorage.getItem('todo-theme')
    else if (darkThemeActiveByDefault) return 'dark'
    else return 'light'
  }

  const saveTheme = (theme) => {
    localStorage.setItem('todo-theme', theme)
  }

  return { getTheme, saveTheme }
}

export default themeStore
