import { useMemo } from 'react'
import rightArrow from '../assets/arrow_right.svg'
function Button({ text, onClickHandler, type, ...rest }) {
  const classBtn = useMemo(() => {
    return type ? `btn btn--${type}` : 'btn'
  }, [type])

  return (
    <button className={classBtn} onClick={onClickHandler} {...rest}>
      {text}
      {type === 'main' && <img src={rightArrow} alt="right arrow" />}
    </button>
  )
}

export default Button
