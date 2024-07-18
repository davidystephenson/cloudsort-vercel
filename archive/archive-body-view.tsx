import { EpisodeArchive } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'

export default function ArchiveBodyView (props: {
  input: EpisodeArchive<ListMovie>
}): JSX.Element {
  return (
    <>
      Archive: {props.input.item.name}
    </>
  )
}
