import { Link } from 'react-router-dom'
import css from './NotFoundPage.module.css'

export default function NotFoundPage() {
  return (
    <div className={css.notFound}>
      <p>The page you are looking for was not found.</p>
      <Link to="/">
        <button>Back to home</button>
      </Link>
    </div>
  )
}
