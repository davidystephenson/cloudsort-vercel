import { EpisodeImport } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { Heading } from '@chakra-ui/react'
import episodeContext from '../episode/episode-context'
import ImportIconView from './import-icon-view'

export default function ImportHeaderView (props: {
  input: EpisodeImport<ListMovie>
}): JSX.Element {
  const episode = episodeContext.useContext()
  return (
    <Heading size='sm'>
      <ImportIconView /> ({episode.element.createdAt})
    </Heading>
  )
}
