import { NavLink } from 'react-router-dom'
import getNavLink from '../../helpers/geLinkClass'
import css from './Navigation.module.css'

export default function Navigation() {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => getNavLink(css, { isActive })}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/movies"
                className={({ isActive }) => getNavLink(css, { isActive })}
              >
                Movies
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}
