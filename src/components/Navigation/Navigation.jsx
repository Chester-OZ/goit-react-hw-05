import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import css from './Navigation.module.css'

const navLinkClass = ({ isActive }) => clsx(css.link, isActive && css.isActive)

export default function Navigation() {
  return (
    <header>
      <nav>
        <ul className={css.navigation}>
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={navLinkClass}>
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
