import { marion } from '@/mergechoice/marion/marion'
import { Actors } from '@/mergechoice/marion/marionTypes'
import { EpisodePart, Item } from '@/mergechoice/mergeChoiceTypes'
import episodeContext from './episode-context'
import ArchiveEpisodeView from './archive-episode-view'
import ChoiceEpisodeView from './choice-episode-view'
import ImportEpisodeView from './import-episode-view'
import RandomEpisodeView from './random-episode-view'
import RemoveEpisodeView from './remove-episode-view'
import ResetEpisodeView from './reset-episode-view'
import UnarchiveEpisodeView from './unarchive-episode-view'

export function marionHistoryElement<
  ListItem extends Item,
  Complement,
> (props: {
  actors: Actors<Complement, JSX.Element, EpisodePart<ListItem>>
  complement: Complement
  part: EpisodePart<ListItem>
}): JSX.Element {
  const mapped = marion(props)
  return mapped
}

export default function EpisodeConsumer (): JSX.Element {
  const episode = episodeContext.useContext()
  const views = {
    archive: ArchiveEpisodeView,
    choice: ChoiceEpisodeView,
    import: ImportEpisodeView,
    random: RandomEpisodeView,
    remove: RemoveEpisodeView,
    reset: ResetEpisodeView,
    unarchive: UnarchiveEpisodeView
  }
  const element = marionHistoryElement({
    actors: views,
    complement: {},
    part: episode.doc
  })
  const consumer = <>{element}</>
  return consumer
}
