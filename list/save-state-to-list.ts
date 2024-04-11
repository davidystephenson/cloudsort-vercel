import { Movie, Prisma } from '@prisma/client'
import { RelatedList } from './list-types'
import { State } from '../mergeChoice/mergeChoiceTypes'
import { PrismaTransaction } from '../prisma/prisma-types'
import prisma from '@/prisma/prisma'
import getNumberKeys from '@/get-number-keys/get-number-keys'

export default async function saveStateToList (props: {
  list: RelatedList
  state: State<Movie>
  tx?: PrismaTransaction
}): Promise<void> {
  const db = props.tx ?? prisma

  const finalPromises: Array<Promise<unknown>> = []
  const listChanges: Prisma.ListUpdateInput = {}
  if (props.list.operationCount !== props.state.operationCount) {
    listChanges.operationCount = props.state.operationCount
  }
  if (props.list.choiceCount !== props.state.choiceCount) {
    listChanges.choiceCount = props.state.choiceCount
  }
  await db.list.update({
    where: {
      id: props.list.id
    },
    data: listChanges
  })
  const oldChoices = props.list.choices.filter((choice) => choice.mergeChoiceId !== props.state.choice?.mergeChoiceId)
  if (oldChoices.length > 0) {
    const oldChoiceIds = oldChoices.map((choice) => choice.id)
    await db.choice.updateMany({
      where: {
        id: {
          in: oldChoiceIds
        }
      },
      data: {
        active: false
      }
    })
  }
  const activeChoice = props.list.choices.find((choice) => choice.mergeChoiceId === props.state.choice?.mergeChoiceId)
  if (props.state.choice != null && props.state.choice.mergeChoiceId !== activeChoice?.mergeChoiceId) {
    await db.choice.create({
      data: {
        ...props.state.choice,
        active: true,
        listId: props.list.id,
        mergeChoiceId: props.state.choice.mergeChoiceId,
        operationMergeChoiceId: props.state.choice.operationMergeChoiceId,
        options: {
          createMany: {
            data: props.state.choice.options.map((id, index) => ({
              index,
              movieId: Number(id)
            }))
          }
        }
      },
      include: {
        options: true
      }
    })
  }
  const activeOperationIds = getNumberKeys({ object: props.state.activeOperations })
  const betterOperationIds = getNumberKeys({ object: props.state.betterOperations })
  const worseOperationIds = getNumberKeys({ object: props.state.worseOperations })
  const newStateOperationIds = [...activeOperationIds, ...betterOperationIds, ...worseOperationIds]
  const oldOperations = props.list.operations.filter((operation) => {
    const old = !newStateOperationIds.includes(operation.mergeChoiceId)
    return old
  })
  const oldOperationIds = oldOperations.map((operation) => operation.id)
  await db.operation.deleteMany({
    where: {
      id: {
        in: oldOperationIds
      }
    }
  })
  const newOperationIds = newStateOperationIds.filter((id) => {
    const old = props.list.operations.some((operation) => {
      const match = operation.mergeChoiceId === id
      return match
    })
    const _new = !old
    return _new
  })
  const newOperationPromises = newOperationIds.map(async (id) => {
    const activeOperation = props.state.activeOperations[id]
    const betterOperation = props.state.betterOperations[id]
    const worseOperation = props.state.worseOperations[id]
    const newOperation = activeOperation ?? betterOperation ?? worseOperation
    const active = activeOperation != null
    const better = betterOperation != null
    const worse = worseOperation != null
    const operation = await db.operation.create({
      data: {
        active,
        better,
        listId: props.list.id,
        priority: newOperation.priority,
        mergeChoiceId: id,
        worse
      }
    })
    const inputPromises = newOperation.input.map(async (inputIds, index) => {
      const input = await db.input.create({
        data: {
          index,
          operationId: operation.id
        }
      })
      const inputMoviePromises = inputIds.map(async (inputId, index) => {
        const inputMovie = await db.inputMovie.create({
          data: {
            index,
            inputId: input.id,
            movieId: Number(inputId)
          }
        })
        return inputMovie
      })
      await Promise.all(inputMoviePromises)
    })
    await Promise.all(inputPromises)
    const outputPromises = newOperation.output.map(async (outputId, index) => {
      const outputMovie = await db.outputMovie.create({
        data: {
          index,
          movieId: Number(outputId),
          operationId: operation.id
        }
      })
      return outputMovie
    })
    await Promise.all(outputPromises)
    return operation
  })
  finalPromises.push(...newOperationPromises)
  const maintainedOperationsIds = newStateOperationIds.filter((id) => {
    const old = oldOperations.some((oldOperation) => {
      const match = oldOperation.mergeChoiceId === id
      return match
    })
    if (old) {
      return false
    }
    const _new = newOperationIds.includes(id)
    if (_new) {
      return false
    }
    return true
  })
  const updateOperationPromises = maintainedOperationsIds.map(async (id) => {
    const oldOperation = props.list.operations.find((operation) => operation.mergeChoiceId === id)
    if (oldOperation == null) {
      throw new Error('There is no old operation')
    }
    const activeOperation = props.state.activeOperations[id]
    const betterOperation = props.state.betterOperations[id]
    const worseOperation = props.state.worseOperations[id]
    const operation = activeOperation ?? betterOperation ?? worseOperation
    if (oldOperation.inputs.length > operation.input.length) {
      await db.input.deleteMany({
        where: {
          operationId: oldOperation.id,
          index: {
            gte: operation.input.length
          }
        }
      })
    }
    const updateInputPromises = operation.input.map(async (inputIds, index) => {
      const oldInput = oldOperation.inputs[index]
      if (oldInput == null) {
        await db.input.create({
          data: {
            index,
            operationId: oldOperation.id,
            inputMovies: {
              createMany: {
                data: inputIds.map((inputId, index) => ({
                  index,
                  movieId: Number(inputId)
                }))
              }
            }
          }
        })
      } else {
        if (oldInput.inputMovies.length > inputIds.length) {
          await db.inputMovie.deleteMany({
            where: {
              inputId: oldInput.id,
              index: {
                gte: inputIds.length
              }
            }
          })
        }
        const updateInputMoviePromises = inputIds.map(async (inputId, index) => {
          const oldInputMovie = oldInput.inputMovies[index]
          if (oldInputMovie == null) {
            await db.inputMovie.create({
              data: {
                index,
                inputId: oldInput.id,
                movieId: Number(inputId)
              }
            })
          } else if (oldInputMovie.movieId !== inputId) {
            await db.inputMovie.update({
              where: {
                id: oldInputMovie.id
              },
              data: {
                movieId: Number(inputId)
              }
            })
          }
        })
        await Promise.all(updateInputMoviePromises)
      }
    })
    await Promise.all(updateInputPromises)
    if (oldOperation.outputMovies.length > operation.output.length) {
      await db.outputMovie.deleteMany({
        where: {
          operationId: oldOperation.id,
          index: {
            gte: operation.output.length
          }
        }
      })
    }
    const updateOutputPromises = operation.output.map(async (outputId, index) => {
      const oldOutput = oldOperation.outputMovies[index]
      if (oldOutput == null) {
        await db.outputMovie.create({
          data: {
            index,
            operationId: oldOperation.id,
            movieId: Number(outputId)
          }
        })
      } else if (oldOutput.movieId !== outputId) {
        await db.outputMovie.update({
          where: {
            id: oldOutput.id
          },
          data: {
            movieId: Number(outputId)
          }
        })
      }
    })
    await Promise.all(updateOutputPromises)
    const active = activeOperation != null
    const better = betterOperation != null
    const worse = worseOperation != null
    let changed = false
    const changes: Record<string, boolean> = {}
    if (oldOperation?.active !== active) {
      changed = true
      changes.active = active
    }
    if (oldOperation?.better !== better) {
      changed = true
      changes.better = better
    }
    if (oldOperation?.worse !== worse) {
      changed = true
      changes.worse = worse
    }
    if (changed) {
      await db.operation.update({
        where: {
          id: oldOperation.id
        },
        data: changes
      })
    }
  })
  finalPromises.push(...updateOperationPromises)
  const oldReserveIds = props
    .list
    .movieReservations
    .map((reservation) => reservation.movieId)
  const removedReserveIds = oldReserveIds.filter((id) => {
    const removed = !props.state.reserveIds.includes(id)
    return removed
  })
  const deleteReservePromise = db.movieReservation.deleteMany({
    where: {
      movieId: {
        in: removedReserveIds
      }
    }
  })
  finalPromises.push(deleteReservePromise)
  const addedReserveIds = props.state.reserveIds.filter((id) => {
    if (typeof id !== 'number') {
      return false
    }
    const existing = oldReserveIds.includes(id)
    return !existing
  })
  const reservationsData = addedReserveIds.map((id) => {
    return {
      listId: props.list.id,
      movieId: Number(id)
    }
  })
  const createReservationPromise = db.movieReservation.createMany({
    data: reservationsData
  })
  finalPromises.push(createReservationPromise)
  await Promise.all(finalPromises)
}
