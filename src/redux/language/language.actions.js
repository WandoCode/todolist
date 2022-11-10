import { createAction } from '@reduxjs/toolkit'

const setLanguage = createAction('language/setLanguage', (language) => ({
  payload: { language },
}))

const setTranslation = createAction('language/setTranslation', (texts) => ({
  payload: { texts },
}))

export { setLanguage, setTranslation }
