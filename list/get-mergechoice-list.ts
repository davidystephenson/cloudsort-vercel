import arrayToDictionary from '../mergeChoice/arrayToDictionary'
import getItemIdsFromOperations from '../mergeChoice/getItemIdsFromOperations'
import { MovieState, MergechoiceList, RelatedList } from './list-types'
import { ListedMovie } from '@/movie/movie-types'

export default async function getMergechoiceList (props: {
  list: RelatedList
}): Promise<MergechoiceList> {
  const activeChoices = props.list.choices.filter((choice) => choice.active)
  if (activeChoices.length > 1) {
    throw new Error('There is more than one active choice')
  }
  const activeChoice = activeChoices[0]

  const stateOperations = props.list.operations.map((operation) => {
    const inputIds = operation.inputs.map((input) => input.inputMovies.map((inputMovie) => inputMovie.movieId))
    const outputIds = operation.outputMovies.map((outputMovie) => outputMovie.movieId)
    const stateOperation = {
      active: operation.active,
      better: operation.better,
      id: operation.id,
      input: inputIds,
      mergeChoiceId: operation.mergeChoiceId,
      output: outputIds,
      priority: operation.priority,
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
  const movies = props.list.listMovies.map((listMovie) => {
    const movie: ListedMovie = {
      mergeChoiceId: listMovie.mergeChoiceId,
      ...listMovie.movie
    }
    return movie
  })
  const items = movies.reduce<Record<number, ListedMovie>>((items, movie) => {
    return {
      ...items,
      [movie.mergeChoiceId]: movie
    }
  }, {})
  const reserveIds = props.list.movieReservations.map((reservation) => reservation.movieId)
  const complete = activeChoice == null && Object.keys(items).length > 0
  const state: MovieState = {
    activeIds,
    activeOperations,
    betterIds,
    betterOperations,
    choiceCount: props.list.choiceCount,
    complete,
    history: [],
    itemCount: props.list.itemCount,
    items,
    operationCount: props.list.operationCount,
    reserveIds,
    seed: props.list.seed,
    worseOperations,
    worseIds
  }
  if (activeChoice != null) {
    const activeChoice = activeChoices[0]
    const options = activeChoice.options.map((option) => option.movieId)
    const choice = {
      ...activeChoice,
      options
    }
    state.choice = choice
  }
  return {
    list: props.list,
    state
  }
}
