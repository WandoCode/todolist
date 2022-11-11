import { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'

import arrowUp from '../assets/caret-up.svg'
import arrowDown from '../assets/caret-down.svg'

const LANGUAGES = ['eng', 'fr', 'es']
const languagesDisplay = { eng: 'Eng', fr: 'Fr', es: 'Es' }

function Dropdown({ onChoice, name }) {
  const [openMenu, setOpenMenu] = useState(false)
  const [currValue, setCurrValue] = useState()

  const userLanguage = useSelector((state) => state.language.language)

  useEffect(() => {
    if (userLanguage) setLanguageOnLoad()
  }, [userLanguage])

  useEffect(() => {
    if (!openMenu) return

    document.body.addEventListener('mousedown', handleBlur)

    return () => document.body.removeEventListener('mousedown', handleBlur)
  }, [openMenu])

  const setLanguageOnLoad = () => {
    LANGUAGES.includes(userLanguage)
      ? setCurrValue(userLanguage)
      : setCurrValue('eng')
  }

  const handleInput = (e) => {
    const value = e.target.value

    if (value !== currValue) {
      setCurrValue(value)
      onChoice(e)
    }

    setOpenMenu(false)
  }

  const choicesOptions = useMemo(() => {
    return LANGUAGES.map((choice) => {
      return (
        <label
          htmlFor={choice}
          key={choice}
          className="dropdown__label"
          role="menuitemradio"
          aria-checked={choice === userLanguage?.toLowerCase()}
        >
          <input
            type="radio"
            name={name}
            id={choice}
            onChange={handleInput}
            value={choice}
          />
          {languagesDisplay[choice]}
        </label>
      )
    })
  }, [LANGUAGES, userLanguage])

  const handleBtnClick = () => {
    setOpenMenu(openMenu ? false : true)
  }

  const handleBlur = (e) => {
    if (!e.target.className.includes('dropdown')) setOpenMenu(false)
  }

  return (
    <div className="dropdown">
      <button
        type="button"
        onClick={handleBtnClick}
        className="dropdown__selected"
        id={name}
        name={name}
        data-open={openMenu}
        aria-haspopup="true"
        aria-controls="language-choice"
        aria-expanded={!!openMenu}
      >
        {languagesDisplay[currValue]}

        {openMenu ? (
          <img src={arrowUp} alt="arrow up" className="dropdown__img" />
        ) : (
          <img src={arrowDown} alt="arrow down" className="dropdown__img" />
        )}
      </button>

      {openMenu && (
        <div id="language-choice" className="dropdown__options" role="menu">
          {choicesOptions}
        </div>
      )}
    </div>
  )
}

export default Dropdown
