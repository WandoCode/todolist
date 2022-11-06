import { useMemo } from 'react'
import rightArrow from '../assets/arrow_right.svg'
import trashIcone from '../assets/trash.svg'
import archiveIcone from '../assets/archive.svg'
import normalIcone from '../assets/normal.svg'
import pinIcone from '../assets/pin.svg'

function Button({ text, onClickHandler, type, tooltipText, ...rest }) {
  const classBtn = useMemo(() => {
    return type ? `btn btn--${type}` : 'btn'
  }, [type])

  return (
    <button className={classBtn} onClick={onClickHandler} {...rest}>
      {text}
      {type === 'main' && <img src={rightArrow} alt="right arrow" />}
      {type === 'pin' && <img src={pinIcone} alt="star" />}
      {type === 'archive' && <img src={archiveIcone} alt="minus" />}
      {type === 'unpin' && <img src={normalIcone} alt="minus" />}
      {type === 'unarchive' && <img src={normalIcone} alt="minus" />}
      {type === 'delete' && <img src={trashIcone} alt="trashcan" />}
      <div className="btn__tooltip">{tooltipText}</div>
    </button>
  )
}

export default Button
