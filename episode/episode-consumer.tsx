import episodeContext from './episode-context'
import ArchiveBodyView from '../archive/archive-body-view'
import ChoiceBodyView from '../choice/choice-body-view'
import ImportEpisodeView from '../import/import-body-view'
import RandomBodyView from '../random/random-body-view'
import RemoveEpisodeView from '../remove/remove-body-view'
import ResetBodyView from '../reset/reset-body-view'
import UnarchiveBodyView from '../unarchive/unarchive-body-view'
import { Card, CardHeader, HStack, CardBody } from '@chakra-ui/react'
import ArchiveHeaderView from '@/archive/archive-header-view'
import ChoiceHeaderView from '@/choice/choice-header-view'
import ImportHeaderView from '@/import/import-header-view'
import RandomHeaderView from '@/random/random-header-view'
import RemoveHeaderView from '@/remove/remove-header-view'
import ResetHeaderView from '@/reset/reset-header-view'
import UnarchiveHeaderView from '@/unarchive/unarchive-header-view'
import RewindButton from '@/rewind/rewind-button'
import marionEpisodeElement from './marion-episode-element'

export default function EpisodeConsumer (): JSX.Element {
  const episode = episodeContext.useContext()
  const headers = {
    archive: ArchiveHeaderView,
    choice: ChoiceHeaderView,
    import: ImportHeaderView,
    random: RandomHeaderView,
    remove: RemoveHeaderView,
    reset: ResetHeaderView,
    unarchive: UnarchiveHeaderView
  }
  const header = marionEpisodeElement({
    actors: headers,
    complement: {},
    part: episode.element
  })
  const bodies = {
    archive: ArchiveBodyView,
    choice: ChoiceBodyView,
    import: ImportEpisodeView,
    random: RandomBodyView,
    remove: RemoveEpisodeView,
    reset: ResetBodyView,
    unarchive: UnarchiveBodyView
  }
  const body = marionEpisodeElement({
    actors: bodies,
    complement: {},
    part: episode.element
  })
  const consumer = (
    <Card size='sm' mb='10px'>
      <CardHeader>
        <HStack>
          {header}
          <RewindButton />
        </HStack>
      </CardHeader>
      <CardBody>
        {body}
      </CardBody>
    </Card>
  )
  return consumer
}
