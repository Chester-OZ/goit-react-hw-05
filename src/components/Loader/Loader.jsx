import { RotatingLines } from 'react-loader-spinner'
import css from './Loader.module.css'

export default function Loader({ isLoading }) {
  return (
    <RotatingLines
      visible={isLoading}
      height="40"
      width="40"
      strokeColor="#595959"
      wrapperClass={css.loader}
      ariaLabel="rotating-lines-loading"
    />
  )
}
