import { useEffect, useState } from 'react'

import arrowUp from '../assets/caret-up.svg'
import arrowDown from '../assets/caret-down.svg'

function Dropdown({ choicesArray, onChoice, name }) {
  const [openMenu, setOpenMenu] = useState(false)
  const [currValue, setCurrValue] = useState(choicesArray[0])

  const handleInput = (e) => {
    onChoice(e)
    setCurrValue(e.target.value)
    setOpenMenu(false)
  }

  const choicesOptions = choicesArray.map((choice) => {
    return (
      <label htmlFor={choice} key={choice} className="dropdown__label">
        <input
          type="radio"
          name={name}
          id={choice}
          onChange={handleInput}
          value={choice}
        />
        {choice}
      </label>
    )
  })

  const handleBtnClick = () => {
    setOpenMenu(openMenu ? false : true)
  }

  useEffect(() => {
    if (!openMenu) return
    document.body.addEventListener('mousedown', handleBlur)
    return () => document.body.removeEventListener('mousedown', handleBlur)
  }, [openMenu])

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
      >
        {currValue}
        {openMenu ? (
          <img src={arrowUp} alt="arrow up" className="dropdown__img" />
        ) : (
          <img src={arrowDown} alt="arrow down" className="dropdown__img" />
        )}
      </button>
      {openMenu && <div className="dropdown__options">{choicesOptions}</div>}
    </div>
  )
}

export default Dropdown
