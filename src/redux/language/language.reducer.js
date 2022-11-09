import { createReducer } from '@reduxjs/toolkit'
import { setLanguage } from './language.actions'
const initialState = {
  language: null,
}

const languageReducer = createReducer(initialState, (builder) =>
  builder.addCase(setLanguage, (state, action) => {
    state.language = action.payload.language
  })
)

export default languageReducer
