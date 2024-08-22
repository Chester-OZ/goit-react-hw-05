import css from './MovieItem.module.css'
import { Link, useLocation } from 'react-router-dom'
import { posterURL, placeholderURL } from '../../api/tmdb'
import { formatDate } from '../../helpers/formatDate'

export default function MovieItem({ id, title, vote, release, poster }) {
  const location = useLocation()

  const posterSrc = poster ? `${posterURL}${poster}` : placeholderURL

  return (
    <li className={css.item}>
      <Link to={`/movies/${id}`} state={location}>
        <img src={posterSrc} alt={`${title} poster`} className={css.image} />
        <div className={css.details}>
          <p>{(vote * 10).toFixed(0)}%</p>
          <p className={css.releaseDate}>{formatDate(release)}</p>
          <h3>{title}</h3>
        </div>
      </Link>
    </li>
  )
}
