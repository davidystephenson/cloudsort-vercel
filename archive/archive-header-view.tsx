import { Heading } from '@chakra-ui/react'
import episodeContext from '../episode/episode-context'

export default function ArchiveHeaderView (): JSX.Element {
  const episode = episodeContext.useContext()
  return (
    <Heading size='sm'>
      Archive ({episode.element.createdAt})
    </Heading>
  )
}
