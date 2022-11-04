const validateForm = (formDatas) => {
  const validationErrors = []

  const validators = {
    email: emailIsValid,
    password: passwordIsValid,
    confirmation: confirmationIsValid,
  }

  for (const name in formDatas) {
    const value = formDatas[name]
    const valueIsValid = validators[name]

    if (!valueIsValid(value)) validationErrors.push(name)
  }

  return validationErrors
}

const emailIsValid = (email) => {
  if (!email) return false
  if (email.length === 0) return false
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
  if (!password) return false

  return password.length >= 6
}

const confirmationIsValid = (confirmation, password) => {
  if (!confirmation) return false

  return password.length >= 6 && confirmation === password
}
export { validateForm }
