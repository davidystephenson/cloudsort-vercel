import { Movie } from '@prisma/client'
import { ApiError } from 'next/dist/server/api-utils'
import arrayToDictionary from '../mergeChoice/arrayToDictionary'
import getItemIdsFromOperations from '../mergeChoice/getItemIdsFromOperations'
import { State, ItemId } from '../mergeChoice/merge-choice-types'
import prisma from '@/lib/prisma/prisma'
import { MergechoiceList } from './list-types'

export default async function getMergeChoiceList (props: {
  listId: number
  userId?: number
}): Promise<MergechoiceList> {
  const list = await prisma.list.findFirst({
    where: {
      id: props.listId
    },
    include: {
      operations: {
        include: {
          inputs: {
            include: {
              inputMovies: true
            }
          },
          outputMovies: true
        }
      },
      movieReservations: true,
      choices: {
        where: {
          active: true
        },
        include: {
          options: true
        }
      }
    }
  })
  if (list == null) {
    throw new ApiError(404, 'This list does not exist')
  }
  if (props.userId != null && list.userId !== props.userId) {
    throw new ApiError(403, 'This is not your list')
  }

  const stateOperations = list.operations.map((operation) => {
    const inputIds = operation.inputs.map((input) => input.inputMovies.map((inputMovie) => inputMovie.movieId))
    const outputIds = operation.outputMovies.map((outputMovie) => outputMovie.movieId)
    const stateOperation = {
      active: operation.active,
      better: operation.better,
      id: operation.id,
      input: inputIds,
      mergeChoiceId: operation.mergeChoiceId,
      output: outputIds,
      worse: operation.worse
    }
    return stateOperation
  })
  const activeOperationArray = stateOperations.filter((operation) => operation.active)
  const activeOperations = arrayToDictionary({ array: activeOperationArray })
  const activeIds = getItemIdsFromOperations({ operations: activeOperations })
  const betterOperationArray = stateOperations.filter((operation) => operation.better)
  const betterOperations = arrayToDictionary({ array: betterOperationArray })
  const betterIds = getItemIdsFromOperations({ operations: betterOperations })
  const worseOperationArray = stateOperations.filter((operation) => operation.worse)
  const worseOperations = arrayToDictionary({ array: worseOperationArray })
  const worseIds = getItemIdsFromOperations({ operations: worseOperations })
  const itemIds = [...activeIds, ...betterIds, ...worseIds].map((id) => Number(id))
  const movies = await prisma.movie.findMany({
    where: {
      id: {
        in: itemIds
      }
    }
  })
  const items = movies.reduce<Record<ItemId, Movie>>((items, movie) => {
    return {
      ...items,
      [movie.id]: movie
    }
  }, {})
  const reserveIds = list.movieReservations.map((reservation) => reservation.movieId)
  const state: State<Movie> = {
    activeIds,
    activeOperations,
    betterIds,
    betterOperations,
    complete: false,
    history: [],
    items,
    reserveIds,
    worseOperations,
    worseIds
  }
  const activeChoices = list.choices.filter((choice) => choice.active)
  if (activeChoices.length > 1) {
    throw new Error('There is more than one active choice')
  }
  const activeChoice = activeChoices[0]
  if (activeChoice != null) {
    const options = activeChoice.options.map((option) => option.movieId)
    const choice = {
      ...activeChoice,
      options
    }
    state.choice = choice
  }
  return {
    list,
    state
  }
}
