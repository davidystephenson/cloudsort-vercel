import { Movie } from '@prisma/client'
import { RelatedList } from './list-types'
import { State } from '../mergeChoice/merge-choice-types'
import { PrismaTransaction } from '../prisma/prisma-types'

export default async function saveStateToList (props: {
  list: RelatedList
  state: State<Movie>
  transaction: PrismaTransaction
}): Promise<void> {
  const oldChoices = props.list.choices.filter((choice) => choice.mergeChoiceId !== props.state.choice?.mergeChoiceId)
  if (oldChoices.length > 0) {
    const oldChoiceIds = oldChoices.map((choice) => choice.id)
    await props.transaction.choice.updateMany({
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
  if (props.state.choice != null) {
    console.log('save choice', props.state.choice)
    await props.transaction.choice.create({
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
  const activeOperationIds = Object.keys(props.state.activeOperations)
  const betterOperationIds = Object.keys(props.state.betterOperations)
  const worseOperationIds = Object.keys(props.state.worseOperations)
  const newStateOperationIds = [...activeOperationIds, ...betterOperationIds, ...worseOperationIds]
  const oldOperations = props.list.operations.filter((operation) => {
    const old = !newStateOperationIds.includes(operation.mergeChoiceId)
    return old
  })
  const oldOperationIds = oldOperations.map((operation) => operation.id)
  await props.transaction.operation.deleteMany({
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
    const operation = await props.transaction.operation.create({
      data: {
        active,
        better,
        listId: props.list.id,
        mergeChoiceId: id,
        worse
      }
    })
    const inputPromises = newOperation.input.map(async (inputIds, index) => {
      const input = await props.transaction.input.create({
        data: {
          index,
          operationId: operation.id
        }
      })
      const inputMoviePromises = inputIds.map(async (inputId, index) => {
        const inputMovie = await props.transaction.inputMovie.create({
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
      const outputMovie = await props.transaction.outputMovie.create({
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
  await Promise.all(newOperationPromises)
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
      await props.transaction.input.deleteMany({
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
        await props.transaction.input.create({
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
          await props.transaction.inputMovie.deleteMany({
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
            await props.transaction.inputMovie.create({
              data: {
                index,
                inputId: oldInput.id,
                movieId: Number(inputId)
              }
            })
          } else if (oldInputMovie.movieId !== inputId) {
            await props.transaction.inputMovie.update({
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
      await props.transaction.outputMovie.deleteMany({
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
        await props.transaction.outputMovie.create({
          data: {
            index,
            operationId: oldOperation.id,
            movieId: Number(outputId)
          }
        })
      } else if (oldOutput.movieId !== outputId) {
        await props.transaction.outputMovie.update({
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
      await props.transaction.operation.update({
        where: {
          id: oldOperation.id
        },
        data: changes
      })
    }
  })
  await Promise.all(updateOperationPromises)
  const oldReserveIds = props.list.movieReservations.map((reservation) => reservation.movieId)
  const removedReserveIds = oldReserveIds.filter((id) => {
    const removed = !props.state.reserveIds.includes(id)
    return removed
  })
  await props.transaction.movieReservation.deleteMany({
    where: {
      movieId: {
        in: removedReserveIds
      }
    }
  })
  const addedReserveIds = props.state.reserveIds.filter((id) => {
    if (typeof id !== 'number') {
      const message = `The id ${id} is not a number`
      throw new Error(message)
    }
    const existing = oldReserveIds.includes(id)
    return !existing
  })
  const reservePromises = addedReserveIds.map(async (id) => {
    await props.transaction.movieReservation.create({
      data: {
        listId: props.list.id,
        movieId: Number(id)
      }
    })
  })
  await Promise.all(reservePromises)

  if (props.state.complete !== props.list.complete) {
    await props.transaction.list.update({
      where: {
        id: props.list.id
      },
      data: {
        complete: props.state.complete
      }
    })
  }
}
