import { Heading } from '@chakra-ui/react'
import episodeContext from '../episode/episode-context'

export default function RemoveHeaderView (): JSX.Element {
  const episode = episodeContext.useContext()
  return (
    <Heading size='sm'>
      Remove ({episode.element.createdAt})
    </Heading>
  )
}
