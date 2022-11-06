import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import ThemeSwitch from '../components/ThemeSwitch'
import { logoutUser } from '../redux/auth/auth.actions'

function Layout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userIsConnected = useSelector((state) => state.auth.isConnected)

  const handleLogOut = (e) => {
    e.preventDefault()

    dispatch(logoutUser())
    navigate('/')
  }
  return (
    <>
      <header className="header">
        <ThemeSwitch />

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
