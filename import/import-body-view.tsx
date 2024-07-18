import { EpisodeImport } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'

export default function ImportBodyView (props: {
  input: EpisodeImport<ListMovie>
}): JSX.Element {
  return (
    <>
      Size: {props.input.items.length}
    </>
  )
}
