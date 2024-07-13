import { EVENT_PARTS_RELATION } from '@/event/event-constants'
import { EventResponse } from '@/event/event-types'
import handleEvent from '@/event/handle-event'
import guardChooseMovieRequest from '@/movie/guard-choose-movie-request'
import { ApiError } from 'next/dist/server/api-utils'

export async function POST (request: Request): EventResponse {
  const response = await handleEvent({
    guard: guardChooseMovieRequest,
    label: '/movie/choose',
    createEvent: async (props) => {
      if (typeof props.body.choice.aId !== 'number') {
        throw new ApiError(400, 'aId must be a number.')
      }
      if (typeof props.body.choice.bId !== 'number') {
        throw new ApiError(400, 'bId must be a number.')
      }
      const event = await props.tx.event.create({
        data: {
          choice: {
            create: {
              aBetter: props.body.choice.aBetter,
              aEventItem: {
                create: {
                  itemId: props.body.choice.aId,
                  points: props.body.choice.aItem.points,
                  seed: props.body.choice.aItem.seed,
                  seeding: props.body.choice.aItem.seeding
                }
              },
              betterIndex: props.body.choice.betterIndex,
              bEventItem: {
                create: {
                  itemId: props.body.choice.bId,
                  points: props.body.choice.bItem.points,
                  seed: props.body.choice.bItem.seed,
                  seeding: props.body.choice.bItem.seeding
                }
              },
              random: props.body.choice.random,
              seeded: props.body.choice.seeded
            }
          },
          listId: props.body.listId,
          mergeChoiceId: props.events.length
        },
        include: EVENT_PARTS_RELATION
      })
      return event
    },
    request
  })
  return response
}
