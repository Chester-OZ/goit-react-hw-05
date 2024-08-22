import { format } from 'date-fns'

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return !isNaN(date.getTime()) ? format(date, 'dd MMM yyyy') : undefined
}
