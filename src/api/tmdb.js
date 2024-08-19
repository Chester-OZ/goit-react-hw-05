import axios from 'axios'

const token = import.meta.env.VITE_TMDB_TOKEN
axios.defaults.baseURL = 'https://api.themoviedb.org/3'
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

const trendingURL = '/trending/movie/day'
const detailsURL = '/movie'
const queryURL = '/search/movie'

export const posterURL = 'https://image.tmdb.org/t/p/w500'
export const placeholderURL =
  'https://via.placeholder.com/500x750?text=No+Image'

export const getTrendingMovies = async (page) => {
  const response = await axios.get(trendingURL, { params: { page } })
  const { total_pages: totalPages, results } = response.data
  return { totalPages, results }
}

export const getMovieQuery = async (query, page) => {
  const response = await axios.get(queryURL, { params: { query, page } })
  const { total_pages: totalPages, results } = response.data
  return { totalPages, results }
}

export const getMoviesID = async (movieId) => {
  const response = await axios.get(`${detailsURL}/${movieId}`)
  return response.data
}

export const getMoviesSimilar = async (movieId) => {
  const response = await axios.get(`${detailsURL}/${movieId}/similar`)
  return response.data.results
}

export const getMoviesReviews = async (movieId) => {
  const response = await axios.get(`${detailsURL}/${movieId}/reviews`)
  return response.data.results
}

export const getMovieCredits = async (movieId) => {
  const response = await axios.get(`${detailsURL}/${movieId}/credits`)
  return response.data.cast
}
