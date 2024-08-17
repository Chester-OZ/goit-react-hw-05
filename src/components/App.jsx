import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import './App.css'

import Navigation from './Navigation/Navigation'
import Footer from './Footer/Footer'

const HomePage = lazy(() => import('../pages/HomePage/HomePage'))
const MoviesPage = lazy(() => import('../pages/MoviesPage/MoviesPage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'))
const MovieCast = lazy(() => import('./MovieCast/MovieCast'))
const MovieReviews = lazy(() => import('./MovieReviews/MovieReviews'))
const MovieDetailsPage = lazy(() =>
  import('../pages/MovieDetailsPage/MovieDetailsPage')
)

export default function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/movies" element={<MoviesPage />}></Route>
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />}></Route>
            <Route path="review" element={<MovieReviews />}></Route>
          </Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}
