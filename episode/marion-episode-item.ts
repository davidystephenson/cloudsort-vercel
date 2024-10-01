import { marion } from '@/mergechoice/marion/marion'
import { Calculated, EpisodePart, Item } from '@/mergechoice/mergeChoiceTypes'

export default function marionEpisodeItem <ListItem extends Item> (props: {
  part: EpisodePart<ListItem>
}): Calculated<ListItem> {
  const marioned = marion({
    actors: {
      archive: (props) => props.input.item,
      choice: () => { throw new Error('There is no choice item.') },
      import: () => { throw new Error('There is no import item.') },
      random: () => { throw new Error('There is no random item.') },
      remove: (props) => props.input.item,
      reset: (props) => props.input.item,
      unarchive: (props) => props.input.item
    },
    complement: {},
    part: props.part
  })
  return marioned
}
