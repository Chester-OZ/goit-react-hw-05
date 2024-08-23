import { useState, useEffect } from 'react'
import { getMoviesReviews } from '../../api/tmdb'
import css from './MovieReviews.module.css'
import { useParams } from 'react-router-dom'
import Loader from '../Loader/Loader'

export default function MovieReviews() {
  const { movieId } = useParams()
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true)
      setError(false)

      try {
        const results = await getMoviesReviews(movieId)
        setReviews(results)
      } catch (error) {
        console.error(error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [movieId])

  if (loading) return <Loader />

  if (error) return <p className={css.error}>Oops! Something went wrong</p>

  if (reviews.length === 0) {
    return <p className={css.noReview}>No reviews available</p>
  }

  return (
    <div className={css.reviews}>
      <ul className={css.list}>
        {reviews.map((review) => (
          <li key={review.id} className={css.item}>
            <h3 className={css.author}>{review.author}</h3>
            <p className={css.content}>{review.content}</p>
            <div className={css.line}></div>
          </li>
        ))}
      </ul>
    </div>
  )
}
