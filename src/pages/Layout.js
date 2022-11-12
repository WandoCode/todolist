import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

import { logoutUser } from '../redux/auth/auth.actions'

import Button from '../components/Button'
import LanguageSelect from '../components/LanguageSelect'
import ThemeSwitch from '../components/ThemeSwitch'

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

      <footer>
        <p>
          This website has been build by{' '}
          <a
            href="https://github.com/WandoCode/todolist"
            target="_blank"
            rel="noreferrer"
          >
            WandoCode
          </a>{' '}
          for demonstration purpose only.
        </p>
        <p>
          All the content is published under the{' '}
          <a
            href="https://github.com/WandoCode/todolist/blob/main/licence.txt"
            target="_blank"
            rel="noreferrer"
          >
            MIT licence
          </a>
          .
        </p>
      </footer>
    </>
  )
}

export default Layout
