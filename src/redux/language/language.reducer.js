import { createReducer } from '@reduxjs/toolkit'
import { setLanguage, setTranslation } from './language.actions'
const initialState = {
  language: null,
  texts: null,
}

const languageReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(setLanguage, (state, action) => {
      state.language = action.payload.language
    })
    .addCase(setTranslation, (state, action) => {
      state.texts = action.payload.texts
    })
)

export default languageReducer
