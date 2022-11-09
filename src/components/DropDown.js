import { useEffect, useState } from 'react'

import arrowUp from '../assets/caret-up.svg'
import arrowDown from '../assets/caret-down.svg'
import { useMemo } from 'react'

function Dropdown({ choicesArray, onChoice, name }) {
  const [openMenu, setOpenMenu] = useState(false)
  const [currValue, setCurrValue] = useState()

  useEffect(() => {
    setCurrValue(choicesArray.at(0))
  })

  const handleInput = (e) => {
    setCurrValue(e.target.value)
    onChoice(e)
    setOpenMenu(false)
  }

  const choicesOptions = useMemo(() => {
    return choicesArray.map((choice) => {
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
  }, [choicesArray])

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
