import { Episode } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import siftMovie from '@/movie/sift-movie'
import isResult from '@/movies/isResult'

export default function siftEpisode (props: {
  row: Episode<ListMovie>
  query: string
}): boolean {
  if (props.query === '') {
    return true
  }
  if (props.row.archive != null) {
    return siftMovie({ row: props.row.archive.item, query: props.query })
  }
  if (props.row.choice != null) {
    const aResult = siftMovie({ row: props.row.choice.aItem, query: props.query })
    if (aResult) {
      return true
    }
    const bResult = siftMovie({ row: props.row.choice.bItem, query: props.query })
    if (bResult) {
      return true
    }
    return false
  }
  if (props.row.import != null) {
    return props.row.import.items.some(item => {
      const resulting = isResult({ movie: item, query: props.query })
      return resulting
    })
  }
  if (props.row.random != null) {
    const firstResult = siftMovie({ row: props.row.random.first, query: props.query })
    if (firstResult) {
      return true
    }
    const secondResult = siftMovie({ row: props.row.random.second, query: props.query })
    return secondResult
  }
  if (props.row.remove != null) {
    return isResult({ movie: props.row.remove.item, query: props.query })
  }
  if (props.row.reset != null) {
    return isResult({ movie: props.row.reset.item, query: props.query })
  }
  if (props.row.unarchive != null) {
    return isResult({ movie: props.row.unarchive.item, query: props.query })
  }
  const json = JSON.stringify(props.row)
  const message = `Unexpected event: ${json}`
  throw new Error(message)
}
