import css from './CastList.module.css'
import { placeholderURL, posterURL } from '../../api/tmdb'

export default function CastList({ movieCredits, visibleCount, firstCastRef }) {
  return (
    <ul className={css.list}>
      {movieCredits
        .slice(0, visibleCount)
        .map(({ profile_path, name, character, cast_id }, index) => {
          const profileImgSrc = profile_path
            ? `${posterURL}${profile_path}`
            : placeholderURL
          return (
            <li key={cast_id} ref={index === 0 ? firstCastRef : undefined}>
              <div>
                <img src={profileImgSrc} alt={`${name} в ролі ${character}`} />
              </div>
              <div className={css.description}>
                <p className={css.name}>{name}</p>
                <p>{character}</p>
              </div>
            </li>
          )
        })}
    </ul>
  )
}
