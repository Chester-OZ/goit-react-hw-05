import css from './MovieCast.module.css'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn'
import Loader from '../Loader/Loader'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieCredits, placeholderURL, posterURL } from '../../api/tmdb'

export default function MovieCast() {
  const { movieId } = useParams()
  const [movieCredits, setMovieCredits] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [visibleCount, setVisibleCount] = useState(5)
  const loadMoreRef = useRef()
  const firstCastRef = useRef(null)

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 5)
  }

  useEffect(() => {
    const getData = async () => {
      try {
        setIsError(false)
        setIsLoading(true)
        const credits = await getMovieCredits(movieId)
        setMovieCredits(credits)
      } catch (error) {
        console.error(error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    getData()

    return () => {
      setIsLoading(false)
    }
  }, [movieId])

  if (isError) {
    return <ErrorMessage>Please, reload the page</ErrorMessage>
  }

  if (!isLoading && movieCredits.length === 0) {
    return <ErrorMessage>No cast information found...</ErrorMessage>
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <ul className={css.creditsList}>
        {movieCredits
          .slice(0, visibleCount)
          .map(({ profile_path, name, character, cast_id }, index) => {
            const profileImgSrc = profile_path
              ? `${posterURL}${profile_path}`
              : placeholderURL
            return (
              <li key={cast_id} ref={index === 0 ? firstCastRef : undefined}>
                <div>
                  <img src={profileImgSrc} alt={`${name} as ${character}`} />
                </div>
                <div className={css.actorDescription}>
                  <p className={css.actorName}>{name}</p>
                  <p>{character}</p>
                </div>
              </li>
            )
          })}
      </ul>
      <div className={css.loadMoreWrapper} ref={loadMoreRef}>
        {visibleCount < movieCredits.length && (
          <LoadMoreBtn onClick={handleLoadMore}>Load more</LoadMoreBtn>
        )}
      </div>
    </>
  )
}
