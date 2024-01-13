import { CalculatedMovie } from '../movie/movie-types'

export default function compareItems (props: {
  a: CalculatedMovie
  b: CalculatedMovie
  worseFirst?: boolean
}): number {
  if (props.a.points === props.b.points) {
    if (props.b.score === props.a.score) {
      if (props.a.updatedAt === props.b.updatedAt) {
        return props.b.name.localeCompare(props.a.name) * -1
      }
      const bTime = props.b.updatedAt.getTime()
      const aTime = props.a.updatedAt.getTime()
      const difference = bTime - aTime
      return difference
    }
    if (props.worseFirst === true) {
      return props.a.score - props.b.score
    }
    return props.b.score - props.a.score
  }
  if (props.worseFirst === true) {
    return props.a.points - props.b.points
  }
  return props.b.points - props.a.points
}
