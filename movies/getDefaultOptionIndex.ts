import { Movie } from '@prisma/client'
import { Choice } from '../mergeChoice/merge-choice-types'

export default function getDefaultOptionIndex ({
  choice,
  movies
}: {
  choice: Choice | undefined
  movies: Record<string, Movie>
}): number | undefined {
  if (choice == null || choice.options.length === 0) {
    return undefined
  }
  const choices = choice.options.map(option => {
    return movies[option]
  })
  const [firstItem, secondItem] = choices
  const defaultItem = firstItem.score === secondItem.score
    ? undefined
    : firstItem.score > secondItem.score
      ? firstItem
      : secondItem
  const defaultOptionIndex = choice.options.findIndex(option => {
    return option === defaultItem?.id
  })
  if (defaultOptionIndex === -1) {
    return undefined
  }
  return defaultOptionIndex
}
