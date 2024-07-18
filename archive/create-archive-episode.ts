import createEpisode from '@/episode/create-episode'
import { RelatedEpisode } from '@/episode/episode-types'
import { EpisodeArchive } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { Db } from '@/prisma/prisma-types'

export default async function createArchiveEpisode (props: {
  archive: EpisodeArchive<ListMovie>
  db: Db
  listId: number
  mergechoiceId: number
}): Promise<RelatedEpisode> {
  const episode = await createEpisode({
    data: {
      archive: {
        create: {
          episodeItem: {
            create: {
              itemId: props.archive.item.id,
              points: props.archive.item.points,
              seed: props.archive.item.seed,
              seeding: props.archive.item.seeding
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
