import { useEffect, useState } from 'react'
import { getTrendingMovies } from '../../api/tmdb'
import Loader from 'components/Loader/Loader'
import ErrorMessage from 'components/ErrorMessage/ErrorMessage'
import MovieList from 'components/MovieList/MovieList'
import LoadMoreBtn from 'components/LoadMoreBtn/LoadMoreBtn'

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setIsError(null)
      setIsLoading(true)

      try {
        const { totalPages, results } = await getTrendingMovies(page)
        setTrendingMovies((prev) => [...prev, ...results])
        setTotalPages(totalPages)
      } catch (error) {
        setIsError(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrendingMovies()
  }, [page])

  const handleLoadMore = () => setPage((prev) => prev + 1)

  return (
    <div>
      {isError && <ErrorMessage>Please, reload the page</ErrorMessage>}
      <MovieList movies={trendingMovies} />
      <Loader isLoading={isLoading} />

      {trendingMovies.length > 0 && page < totalPages && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore}>Load more</LoadMoreBtn>
      )}
    </div>
  )
}
