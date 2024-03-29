import { Movie } from '@prisma/client'

export default function filterMovie (props: {
  row: Movie
  query: string
}): boolean {
  if (props.row.name.includes(props.query)) {
    return true
  }
  if (props.row.imdbId.includes(props.query)) {
    return true
  }
  if (props.row.review?.includes(props.query) === true) {
    return true
  }
  if (String(props.row.score).includes(props.query)) {
    return true
  }
  if (String(props.row.year).includes(props.query)) {
    return true
  }
  if (props.row.url?.includes(props.query) === true) {
    return true
  }
  return false
}
