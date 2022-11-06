import { useMemo } from 'react'

import { useRef } from 'react'

function Button({
  image,
  text,
  onClickHandler,
  type,
  tooltipText,
  classesArr,
  ...rest
}) {
  const classBtn = useMemo(() => {
    let classString = 'btn'
    if (tooltipText) classString += ' btn--tooltip'
    if (classesArr) {
      classesArr.forEach((el) => {
        classString += ` btn--${el}`
      })
    }
    return classString
  }, [type, classesArr])

  const imageTag = useMemo(() => {
    if (image) return <img src={image} alt="icon" />
  }, [image])

  return (
    <button
      className={classBtn}
      onClick={onClickHandler}
      data-tooltip={tooltipText ? tooltipText : undefined}
      {...rest}
    >
      {text}
      {imageTag}
    </button>
  )
}

export default Button
