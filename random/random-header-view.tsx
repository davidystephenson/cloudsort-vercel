import { Heading } from '@chakra-ui/react'
import episodeContext from '../episode/episode-context'

export default function RandomHeaderView (): JSX.Element {
  const episode = episodeContext.useContext()
  return (
    <Heading size='sm'>
      Random ({episode.element.createdAt})
    </Heading>
  )
}
