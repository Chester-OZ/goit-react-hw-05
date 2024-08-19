import clsx from 'clsx'

export const getNavLink = (css, { isActive }) => {
  return clsx(css.link, isActive && css.active)
}
