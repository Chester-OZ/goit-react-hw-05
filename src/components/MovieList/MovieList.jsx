import css from './MovieList.module.css'
import MovieItem from '../MovieItem/MovieItem'

export default function MovieList({ movies }) {
  return (
    <ul className={css.list}>
      {movies &&
        movies.map(
          ({
            id,
            title,
            vote_average: vote,
            poster_path: poster,
            release_date: release,
          }) => {
            const movieProps = { id, title, vote, release, poster }
            return <MovieItem key={id} {...movieProps} />
          }
        )}
    </ul>
  )
}
