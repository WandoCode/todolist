import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Dropdown from '../components/DropDown'
import ThemeSwitch from '../components/ThemeSwitch'
import { logoutUser } from '../redux/auth/auth.actions'
import { setLanguage } from '../redux/language/language.actions'

const LANGUAGES = ['Eng', 'Fr', 'Es']

function Layout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userIsConnected = useSelector((state) => state.auth.isConnected)
  const userLanguage = useSelector((state) => state.language.language)

  const choicesArray = useMemo(() => {
    if (!userLanguage) return []

    const choicesCopy = [...LANGUAGES]

    choicesCopy.sort((a) => {
      if (a.toLowerCase() === userLanguage) return -1
      else return 1
    })

    return choicesCopy
  }, [userLanguage])

  const handleLogOut = (e) => {
    e.preventDefault()

    dispatch(logoutUser())
    navigate('/')
  }

  const handleLanguage = (e) => {
    const newUserLanguage = e.target.value.toLowerCase()
    dispatch(setLanguage(newUserLanguage))
  }

  return (
    <>
      <header className="header">
        <div className="header__options">
          <ThemeSwitch />
          <Dropdown
            choicesArray={LANGUAGES}
            name="language"
            onChoice={handleLanguage}
          />
        </div>
        {userIsConnected && (
          <Button
            text="Logout"
            onClickHandler={handleLogOut}
            classesArr={['secondary']}
          />
        )}
      </header>

      <main className="main">
        <Outlet />
      </main>
    </>
  )
}

export default Layout
