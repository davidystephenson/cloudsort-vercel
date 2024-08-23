import { CalculatedMovie } from './movie-types'

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
  row: CalculatedMovie
  query: string
}): boolean {
  const query = props.query.toLowerCase()
  const named = lowerIncludes({ query, value: props.row.name })
  if (named) {
    return true
  }
  if (query.startsWith('tt')) {
    const ided = lowerIncludes({ query, value: props.row.imdbId })
    if (ided) {
      return true
    }
  }
  const points = String(props.row.points)
  const pointed = lowerIncludes({ query, value: points })
  if (pointed) {
    return true
  }
  const seed = String(props.row.seed)
  const seeded = lowerIncludes({ query, value: seed })
  if (seeded) {
    return true
  }
  const year = String(props.row.year)
  const yearly = lowerIncludes({ query, value: year })
  if (yearly) {
    return true
  }
  const label = `${props.row.name} (${props.row.year})`
  const labeled = lowerIncludes({ query, value: label })
  if (labeled) {
    return true
  }
  const words = props.query.split(' ')
  if (words.length > 1) {
    const worded = words.every((word) => {
      const worded = siftMovie({ row: props.row, query: word })
      return worded
    })
    if (worded) {
      return true
    }
  }
  return false
}
