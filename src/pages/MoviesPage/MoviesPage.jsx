import css from './MoviesPage.module.css'
import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getMovieQuery } from '../../api/tmdb'

import MovieList from 'components/MovieList/MovieList'
import ErrorMessage from 'components/ErrorMessage/ErrorMessage'
import Loader from 'components/Loader/Loader'
import LoadMoreBtn from 'components/LoadMoreBtn/LoadMoreBtn'
import SearchBar from 'components/SearchBar/SearchBar'

export default function MoviesPage() {
  const [movies, setMovies] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const movieListRef = useRef(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('query') ?? ''
  const page = Number(searchParams.get('page') ?? 1)

  const clearMovies = () => {
    setMovies([])
  }

  const handleLoadMore = () => {
    const newPage = page + 1
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', newPage)
    setSearchParams(newSearchParams)
  }

  useEffect(() => {
    if (!query) return
    const getQuery = async () => {
      try {
        setIsError(false)
        setIsLoading(true)
        const { totalPages, results } = await getMovieQuery(query, page)
        setMovies((prev) => {
          return [...prev, ...results]
        })
        setTotalPages(totalPages)
        setHasSearched(true)
      } catch (error) {
        console.error(error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }
    getQuery()
  }, [page, query])

  return (
    <div className={css.moviesPage}>
      <SearchBar clearMovies={clearMovies} />
      <MovieList movies={movies} ref={movieListRef} />
      {isError && <ErrorMessage>Please, reload the page</ErrorMessage>}
      {hasSearched && movies.length === 0 && !isLoading && !isError && (
        <ErrorMessage>There are no movies</ErrorMessage>
      )}
      <Loader isLoading={isLoading} />
      <div className="loadMoreWrapper">
        {!isLoading && !isError && movies.length > 0 && page < totalPages && (
          <LoadMoreBtn onClick={handleLoadMore}>Load more</LoadMoreBtn>
        )}
      </div>
    </div>
  )
}
