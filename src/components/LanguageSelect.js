import { useDispatch } from 'react-redux'

import setupLanguage from '../redux/language/language.middlewares'
import Dropdown from './DropDown'

function LanguageSelect() {
    const dispatch = useDispatch()

    const handleLanguage = (e) => {
        const newUserLanguage = e.target.value.toLowerCase()

        dispatch(setupLanguage(newUserLanguage))
    }

    return <Dropdown name="language" onChoice={handleLanguage} />
}

export default LanguageSelect
