import { ListMovie } from './movie-types'

function lowerIncludes (props: {
  query: string
  value?: string
}): boolean {
  if (props.value == null) {
    return false
  }
  const lower = props.value.toLowerCase()
  const includes = lower.includes(props.query)
  return includes
}

export default function siftMovie (props: {
  row: ListMovie
  query: string
}): boolean {
  const query = props.query.toLowerCase()
  const named = lowerIncludes({ query, value: props.row.name })
  if (named) {
    return true
  }
  const ided = lowerIncludes({ query, value: props.row.imdbId })
  if (ided) {
    return true
  }
  const seeded = lowerIncludes({ query, value: String(props.row.seed) })
  if (seeded) {
    return true
  }
  const yearly = lowerIncludes({ query, value: String(props.row.year) })
  if (yearly) {
    return true
  }
  return false
}
