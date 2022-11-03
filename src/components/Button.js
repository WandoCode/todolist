import { useMemo } from 'react'

function Button({ text, onClickHandler, type }) {
  const classBtn = useMemo(() => {
    return type ? `btn btn__${type}` : 'btn'
  }, [type])

  return (
    <button className={classBtn} onClick={onClickHandler}>
      {text}
    </button>
  )
}

export default Button
