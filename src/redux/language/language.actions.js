import { createAction } from '@reduxjs/toolkit'

const setLanguage = createAction('language/setLanguage', (language) => ({
  payload: { language },
}))

export { setLanguage }
