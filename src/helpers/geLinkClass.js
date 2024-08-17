import clsx from 'clsx'

export default function getLinkClass(css, { isActive }) {
  return clsx(css.link, isActive && css.active)
}
