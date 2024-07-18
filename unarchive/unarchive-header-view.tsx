import { Heading } from '@chakra-ui/react'
import episodeContext from '../episode/episode-context'

export default function UnarchiveHeaderView (): JSX.Element {
  const episode = episodeContext.useContext()
  return (
    <Heading size='sm'>
      Unarchive ({episode.element.createdAt})
    </Heading>
  )
}
