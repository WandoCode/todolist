const validateForm = ({ email, password, confirmation }) => {
  const validationErrors = []

  if (email && !emailIsValid(email)) {
    validationErrors.push('email')
  }

  if (password && !passwordIsValid(password)) {
    validationErrors.push('password')
  }

  if (confirmation && !confirmationIsValid(confirmation, password)) {
    validationErrors.push('confirmation')
  }

  return validationErrors
}

const emailIsValid = (email) => {
  const arobaseIndex = email.indexOf('@')
  const pointIndex = email.indexOf('.')

  return (
    arobaseIndex !== -1 &&
    pointIndex !== -1 &&
    pointIndex > arobaseIndex &&
    email.length >= 6
  )
}

const passwordIsValid = (password) => {
  return password.length >= 6
}

const confirmationIsValid = (confirmation, password) => {
  return password.length >= 6 && confirmation === password
}
export { validateForm }
