import css from './SimilarMovies.module.css'
import { getMoviesSimilar } from '../../api/tmdb'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MovieList from '../MovieList/MovieList'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Loader from '../Loader/Loader'

export default function SimilarMovies() {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [similarMovies, setSimilarMovies] = useState([])
  const { movieId } = useParams()

  useEffect(() => {
    const getDetails = async () => {
      try {
        setIsLoading(true)
        setIsError(false)

        const similarData = await getMoviesSimilar(movieId)
        setSimilarMovies(similarData)
      } catch (error) {
        console.error(error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    getDetails()
  }, [movieId])

  return (
    <div className={css.similarMovies}>
      {isLoading && <Loader isLoading={isLoading} />}
      {isError && <ErrorMessage>Please, reload the page</ErrorMessage>}
      {!isLoading && !isError && similarMovies.length > 0 && (
        <>
          <h3 className={css.similarMoviesHeading}>Also see</h3>
          <MovieList movies={similarMovies} />
        </>
      )}
      {!isLoading && !isError && similarMovies.length === 0 && (
        <p>No similar movies found</p>
      )}
    </div>
  )
}
