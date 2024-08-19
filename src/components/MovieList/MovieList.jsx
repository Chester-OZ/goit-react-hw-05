import css from './MovieList.module.css'
import MovieItem from '../MovieItem/MovieItem'

export default function MovieList({ movies }) {
  return (
    <ul className={css.list}>
      {movies.map(
        ({
          id,
          title,
          vote_average: vote,
          poster_path: poster,
          release_date: release,
        }) => {
          const movieProps = { id, title, vote, release, poster }
          return (
            <li key={id} className={css.itemContainer}>
              <MovieItem {...movieProps} />
            </li>
          )
        }
      )}
    </ul>
  )
}
