import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import LanguageSelect from '../components/LanguageSelect'
import ThemeSwitch from '../components/ThemeSwitch'
import { logoutUser } from '../redux/auth/auth.actions'

function Layout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const texts = useSelector((state) => state.language.texts?.layout)
  const userIsConnected = useSelector((state) => state.auth.isConnected)

  const handleLogOut = (e) => {
    e.preventDefault()

    dispatch(logoutUser())
    navigate('/')
  }

  return (
    <>
      <header className="header">
        <div className="header__options">
          <ThemeSwitch />
          <LanguageSelect />
        </div>
        {userIsConnected && (
          <Button
            text={texts?.logout}
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
