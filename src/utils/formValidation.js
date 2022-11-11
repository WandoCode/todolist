const validation = (formDatas) => {
  const { password, confirmation, email, message } = formDatas

  const validateForm = () => {
    const validationErrors = []

    const validators = {
      email: emailIsValid,
      password: passwordIsValid,
      confirmation: confirmationIsValid,
      message: messageIsValid,
    }

    for (const name in formDatas) {
      const value = formDatas[name]
      const valueIsValid = validators[name]

      if (!valueIsValid(value)) validationErrors.push(name)
    }

    return validationErrors
  }

  const emailIsValid = () => {
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

  const passwordIsValid = () => {
    if (!password) return false

    return password.length >= 6
  }

  const confirmationIsValid = () => {
    if (!confirmation) return false

    return password.length >= 6 && confirmation === password
  }

  const messageIsValid = () => {
    if (!message) return false

    return message.length > 0
  }

  return { validateForm }
}

export default validation
