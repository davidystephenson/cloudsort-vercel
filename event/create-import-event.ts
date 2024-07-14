import { CalculatedMovie } from '@/movie/movie-types'
import { PrismaTransaction } from '@/prisma/prisma-types'
import { RelatedEvent } from './event-types'
import { EVENT_PARTS_RELATION } from './event-constants'
import { Event } from '@prisma/client'

export default async function createImportEvent (props: {
  events: Event[]
  listId: number
  movies: CalculatedMovie[]
  tx: PrismaTransaction
}): Promise<RelatedEvent> {
  const createdEventItems = props.movies.map((movie) => {
    const eventItem = {
      itemId: movie.id,
      points: movie.points,
      seed: movie.seed,
      seeding: movie.seeding
    }
    return eventItem
  })
  const event = await props.tx.event.create({
    data: {
      import: {
        create: {
          eventItems: {
            create: createdEventItems
          }
        }
      },
      listId: props.listId,
      mergeChoiceId: props.events.length
    },
    include: EVENT_PARTS_RELATION
  })
  return event
}
