import css from './SearchBar.module.css'
import toast, { Toaster } from 'react-hot-toast'
import { CiSearch } from 'react-icons/ci'
import { useSearchParams } from 'react-router-dom'

export default function SearchBar({ clearMovies }) {
  const [, setParams] = useSearchParams()

  const handleSubmit = (e) => {
    e.preventDefault()
    const newQuery = e.target.elements.search.value.trim()

    if (!newQuery) {
      toast.error('Please enter a search query', { duration: 2000 })
      return
    }

    setParams({ query: newQuery, page: 1 })
    clearMovies()
    e.target.reset()
  }

  return (
    <form onSubmit={handleSubmit} className={css.searchForm}>
      <input name="search" type="text" placeholder="Search movies" />
      <button type="submit" aria-label="Search">
        <CiSearch size="22px" />
      </button>
      <Toaster />
    </form>
  )
}
