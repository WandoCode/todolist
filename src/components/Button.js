import { useMemo } from 'react'

function Button({ text, onClickHandler, type, ...rest }) {
  const classBtn = useMemo(() => {
    return type ? `btn btn__${type}` : 'btn'
  }, [type])

  return (
    <button className={classBtn} onClick={onClickHandler} {...rest}>
      {text}
    </button>
  )
}

export default Button
