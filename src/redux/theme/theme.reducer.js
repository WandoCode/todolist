import { createReducer } from '@reduxjs/toolkit'
import { setTheme } from './theme.actions'

const initialState = {
  theme: null,
}

const themeReducer = createReducer(initialState, (builder) => {
  builder.addCase(setTheme, (state, action) => {
    state.theme = action.payload.theme
  })
})

export default themeReducer
