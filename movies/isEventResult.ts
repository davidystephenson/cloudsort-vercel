import isResult from './isResult'
import { Episode } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'

export default function isEpisodeResult (props: {
  episode: Episode<ListMovie>
  query: string
}): boolean {
  if (props.query === '') {
    return true
  }
  if (props.episode.choice != null) {
    const aResult = isResult({ movie: props.episode.choice.aItem, query: props.query })
    if (aResult) {
      return true
    }
    const bResult = isResult({ movie: props.episode.choice.bItem, query: props.query })
    if (bResult) {
      return true
    }
    return false
  }
  if (props.episode.import != null) {
    return props.episode.import.items.some(item => isResult({ movie: item, query: props.query }))
  }
  if (props.episode.remove != null) {
    return isResult({ movie: props.episode.remove.item, query: props.query })
  }
  const json = JSON.stringify(props.episode)
  const message = `Unexpected event: ${json}`
  throw new Error(message)
}
