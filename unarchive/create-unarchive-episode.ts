import createEpisode from '@/episode/create-episode'
import { RelatedEpisode } from '@/episode/episode-types'
import { EpisodeUnarchive } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { Db } from '@/prisma/prisma-types'

export default async function createUnarchiveEpisode (props: {
  unarchive: EpisodeUnarchive<ListMovie>
  db: Db
  listId: number
  mergechoiceId: number
}): Promise<RelatedEpisode> {
  const episode = await createEpisode({
    data: {
      unarchive: {
        create: {
          episodeItem: {
            create: {
              itemId: props.unarchive.item.id,
              points: props.unarchive.item.points,
              seed: props.unarchive.item.seed,
              seeding: props.unarchive.item.seeding
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
