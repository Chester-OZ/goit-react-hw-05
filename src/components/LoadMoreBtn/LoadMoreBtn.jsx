import css from './LoadMoreBtn.module.css'

export default function LoadMoreBtn({ onClick, children }) {
  return (
    <button onClick={onClick} className={css.LoadMoreBtn}>
      {children}
    </button>
  )
}
