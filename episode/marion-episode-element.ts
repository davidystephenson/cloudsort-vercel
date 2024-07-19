import { marion } from '@/mergechoice/marion/marion'
import { Actors } from '@/mergechoice/marion/marionTypes'
import { EpisodePart, Item } from '@/mergechoice/mergeChoiceTypes'

export default function marionEpisodeElement<
  ListItem extends Item,
  Complement,
> (props: {
  actors: Actors<Complement, JSX.Element, EpisodePart<ListItem>>
  complement: Complement
  part: EpisodePart<ListItem>
}): JSX.Element {
  const marioned = marion(props)
  return marioned
}
