import css from './Footer.module.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className={css.footer}>
      <p className={css.text}>
        The project was created using the
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
          className={css.link}
        >
          TMDB
        </a>
        service
      </p>
      <p>&copy; Movies project {currentYear}</p>
    </footer>
  )
}
