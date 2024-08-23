import css from './MovieItem.module.css'
import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'
import { posterURL, placeholderURL } from '../../api/tmdb'
import { formatDate } from '../../helpers/formatDate'

export default function MovieItem({ id, title, vote, release, poster }) {
  const location = useLocation()

  const posterSrc = poster ? `${posterURL}${poster}` : placeholderURL

  const voteClass = clsx({
    [css.low]: vote < 4,
    [css.middle]: vote >= 4 && vote <= 6,
    [css.high]: vote > 6,
  })

  return (
    <li className={css.item}>
      <Link to={`/movies/${id}`} state={location}>
        <img src={posterSrc} alt={`${title} poster`} />
        <div className={css.details}>
          <p className={clsx(css.vote, voteClass)}>
            {vote !== null ? vote.toFixed(1) : 'N/A'}
          </p>
          <p className={css.release}>{formatDate(release)}</p>
          <p className={css.title}>{title}</p>
        </div>
      </Link>
    </li>
  )
}
