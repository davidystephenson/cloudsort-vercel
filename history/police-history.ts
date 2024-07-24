import guardEpisode from '@/episode/guard-episode'
import guardArrayType from '@/fashion-police/guard-array-type'
import { Episode } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'

export default function policeHistory (props: {
  label: string
  value: unknown
}): Array<Episode<ListMovie>> {
  const guarded = guardArrayType({
    label: props.label,
    value: props.value,
    guard: guardEpisode
  })
  return guarded
}
