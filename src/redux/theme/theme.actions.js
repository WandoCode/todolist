import { createAction } from '@reduxjs/toolkit'

const setTheme = createAction('theme/setTheme', (theme) => ({
  payload: { theme },
}))

export { setTheme }
