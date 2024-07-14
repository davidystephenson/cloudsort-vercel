import { ListMovie } from './movie-types'

export default function filterMovie (props: {
  row: ListMovie
  query: string
}): boolean {
  if (props.row.name.includes(props.query)) {
    return true
  }
  if (props.row.imdbId.includes(props.query)) {
    return true
  }
  if (String(props.row.seed).includes(props.query)) {
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
