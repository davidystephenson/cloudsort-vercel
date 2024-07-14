import { CalculatedMovie } from '../movie/movie-types'

export default function compareItems (props: {
  a: CalculatedMovie
  b: CalculatedMovie
  worseFirst?: boolean
}): number {
  if (props.a.points === props.b.points) {
    if (props.b.seed === props.a.seed) {
      return props.b.name.localeCompare(props.a.name) * -1
    }
    if (props.a.seed == null && props.b.seed != null) {
      return 0
    }
    if (props.a.seed == null) {
      return 1
    }
    if (props.b.seed == null) {
      return -1
    }
    if (props.worseFirst === true) {
      return props.a.seed - props.b.seed
    }
    return props.b.seed - props.a.seed
  }
  if (props.worseFirst === true) {
    return props.a.points - props.b.points
  }
  return props.b.points - props.a.points
}
