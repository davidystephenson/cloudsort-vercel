import createEpisode from '@/episode/create-episode'
import { RelatedEpisode } from '@/episode/episode-types'
import { EpisodeReset } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { Db } from '@/prisma/prisma-types'

export default async function createResetEpisode (props: {
  reset: EpisodeReset<ListMovie>
  db: Db
  listId: number
  mergechoiceId: number
}): Promise<RelatedEpisode> {
  const episode = await createEpisode({
    data: {
      reset: {
        create: {
          episodeItem: {
            create: {
              itemId: props.reset.item.id,
              points: props.reset.item.points,
              seed: props.reset.item.seed,
              seeding: props.reset.item.seeding
            }
          }
        }
      }
    },
    db: props.db,
    listId: props.listId,
    mergechoiceId: props.mergechoiceId
  })
  return episode
}
