import createEpisode from '@/episode/create-episode'
import { RelatedEpisode } from '@/episode/episode-types'
import { EpisodeRandom } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { Db } from '@/prisma/prisma-types'

export default async function createRandomEpisode (props: {
  random: EpisodeRandom<ListMovie>
  db: Db
  listId: number
  mergechoiceId: number
}): Promise<RelatedEpisode> {
  const episode = await createEpisode({
    data: {
      random: {
        create: {
          firstEpisodeItem: {
            create: {
              itemId: props.random.first.id,
              points: props.random.first.points,
              seed: props.random.first.seed,
              seeding: props.random.first.seeding
            }
          },
          secondEpisodeItem: {
            create: {
              itemId: props.random.second.id,
              points: props.random.second.points,
              seed: props.random.second.seed,
              seeding: props.random.second.seeding
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
