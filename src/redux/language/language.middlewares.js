import { setLanguage, setTranslation } from './language.actions'
import text from '../../assets/text.json'

const setupLanguage = (language) => {
  return (dispatch) => {
    dispatch(setLanguage(language))
    dispatch(setTranslation(text[language]))
  }
}

export default setupLanguage
