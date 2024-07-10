import { CHOICE_RELATION } from '@/event/event-constants'
import handleEvent from '@/event/handle-event'
import { HandledResponse } from '@/handle/handle-types'
import guardChooseMovieRequest from '@/movie/guard-choose-movie-request'
import { ApiError } from 'next/dist/server/api-utils'
import { Event } from '@prisma/client'

export async function POST (request: Request): HandledResponse<{ event: Event }> {
  const response = await handleEvent({
    guard: guardChooseMovieRequest,
    label: '/movie/choose',
    createEvent: async (eventProps) => {
      if (typeof eventProps.body.choice.aId !== 'number') {
        throw new ApiError(400, 'aId must be a number.')
      }
      if (typeof eventProps.body.choice.bId !== 'number') {
        throw new ApiError(400, 'bId must be a number.')
      }
      const event = await eventProps.tx.event.create({
        data: {
          choice: {
            create: {
              aBetter: eventProps.body.choice.aBetter,
              aEventItem: {
                create: {
                  itemId: eventProps.body.choice.aId,
                  points: eventProps.body.choice.aItem.points,
                  seed: eventProps.body.choice.aItem.seed,
                  seeding: eventProps.body.choice.aItem.seeding
                }
              },
              betterIndex: eventProps.body.choice.betterIndex,
              bEventItem: {
                create: {
                  itemId: eventProps.body.choice.bId,
                  points: eventProps.body.choice.bItem.points,
                  seed: eventProps.body.choice.bItem.seed,
                  seeding: eventProps.body.choice.bItem.seeding
                }
              },
              random: eventProps.body.choice.random,
              seeded: eventProps.body.choice.seeded
            }
          },
          listId: eventProps.body.listId,
          mergeChoiceId: eventProps.events.length
        },
        include: {
          choice: CHOICE_RELATION
        }
      })
      return event
    },
    request
  })
  return response
}
