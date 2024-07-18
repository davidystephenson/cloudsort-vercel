import { Heading } from '@chakra-ui/react'
import episodeContext from '../episode/episode-context'

export default function ResetHeaderView (): JSX.Element {
  const episode = episodeContext.useContext()
  return (
    <Heading size='sm'>
      Reset ({episode.element.createdAt})
    </Heading>
  )
}
