import css from './GoBackButton.module.css'
import { Link } from 'react-router-dom'

export default function GoBackButton({ children, goBack }) {
  return (
    <>
      <Link to={goBack} className={css.goBack}>
        {children}
      </Link>
    </>
  )
}
