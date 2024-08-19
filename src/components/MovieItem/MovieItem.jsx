import css from './MovieItem.module.css'
import { Link, useLocation } from 'react-router-dom'
import { posterURL, placeholderURL } from '../../api/tmdb'
import { formatDate } from '../../helpers/dateFns'

export default function MovieItem({ id, title, vote, release, poster }) {
  const location = useLocation()
  console.log(poster)

  const isValidPoster = poster ? `${posterURL}${poster}` : placeholderURL

  return (
    <Link to={`/movies/${id}`} state={location}>
      <img src={isValidPoster} alt={title} className={css.image} />
      <p>{(vote * 10).toFixed(0)}%</p>
      <p>{formatDate(release)}</p>
      <h2>{title}</h2>
    </Link>
  )
}
