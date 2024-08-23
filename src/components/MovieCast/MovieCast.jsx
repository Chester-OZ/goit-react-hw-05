import ErrorMessage from '../ErrorMessage/ErrorMessage'
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn'
import Loader from '../Loader/Loader'
import CastList from '../CastList/CastList'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieCredits } from '../../api/tmdb'

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

  const loadMoreButton = visibleCount < movieCredits.length && (
    <LoadMoreBtn onClick={handleLoadMore}>Load more</LoadMoreBtn>
  )

  return (
    <>
      <Loader isLoading={isLoading} />
      {isError ? (
        <ErrorMessage>Please, reload the page</ErrorMessage>
      ) : !isLoading && movieCredits.length === 0 ? (
        <ErrorMessage>No cast information found</ErrorMessage>
      ) : (
        <>
          <CastList
            movieCredits={movieCredits}
            visibleCount={visibleCount}
            firstCastRef={firstCastRef}
          />
          <div ref={loadMoreRef}>{loadMoreButton}</div>
        </>
      )}
    </>
  )
}
