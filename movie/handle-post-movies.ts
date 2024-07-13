import { EVENT_PARTS_RELATION } from '@/event/event-constants'
import { eventToHistoryEvent } from '@/list/get-mergechoice-list'
import { HistoryEvent } from '@/mergeChoice/mergeChoiceTypes'
import { PrismaTransaction } from '@/prisma/prisma-types'
import { Event } from '@prisma/client'
import { CreateMoviesRequest, ListMovie } from './movie-types'

export default async function handlePostMovies (props: {
  body: CreateMoviesRequest
  events: Event[]
  tx: PrismaTransaction
}): Promise<HistoryEvent<ListMovie>> {
  const imdbIds = props.body.movies.map((movie) => movie.imdbId)
  const existingMovies = await props.tx.movie.findMany({
    where: {
      imdbId: {
        in: imdbIds
      }
    }
  })
  const existingImdbIds = existingMovies.map((movie) => movie.imdbId)
  const newImdbIds = imdbIds.filter((imdbId) => !existingImdbIds.includes(imdbId))
  const newPayloads = props.body.movies.filter((movie) => {
    const includes = newImdbIds.includes(movie.imdbId)
    return includes
  })
  const newItemData = newPayloads.map((movie) => {
    const data = {
      name: movie.name,
      movie: {
        create: {
          imdbId: movie.imdbId,
          url: movie.url,
          year: movie.year
        }
      }
    }
    return data
  })
  const createdItems = await props.tx.item.createManyAndReturn({
    data: newItemData
  })
  const createdItemIds = createdItems.map((item) => item.id)
  const createdMovies = await props.tx.movie.findMany({
    where: {
      itemId: {
        in: createdItemIds
      }
    }
  })
  const createdEventItems = props.body.movies.map((movie) => {
    const item = createdMovies.find((createMovie) => createMovie.imdbId === movie.imdbId)
    if (item == null) {
      throw new Error('Item not found.')
    }
    const eventItem = {
      itemId: item.itemId,
      points: 0,
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
      listId: props.body.listId,
      mergeChoiceId: props.events.length
    },
    include: EVENT_PARTS_RELATION
  })
  const historyEvent = eventToHistoryEvent({ event })
  return historyEvent
}
