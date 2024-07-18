import { Db } from '@/prisma/prisma-types'
import { Prisma } from '@prisma/client'
import { EPISODE_PARTS_RELATION } from './episode-constants'
import { RelatedEpisode } from './episode-types'

export default async function createEpisode (props: {
  data: Partial<Prisma.EpisodeCreateInput>
  db: Db
  mergechoiceId: number
  listId: number
}): Promise<RelatedEpisode> {
  const data: Prisma.EpisodeUncheckedCreateInput = {
    listId: props.listId,
    mergeChoiceId: props.mergechoiceId,
    ...props.data
  }
  const episode = await props.db.episode.create({
    data,
    include: EPISODE_PARTS_RELATION
  })
  return episode
}
