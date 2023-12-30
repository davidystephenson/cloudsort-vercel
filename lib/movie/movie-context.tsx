import { Movie } from '@prisma/client'
import { MovieContextValue } from './movie-types'
import { contextCreator } from '../context-creator/context-creator'

function useValue (props: {
  row: Movie
}): MovieContextValue {
  const value: MovieContextValue = {
    row: props.row
  }
  return value
}

export const {
  useCreatedContext: useMovie,
  CreatedProvider: MovieProvider
} = contextCreator({ name: 'movie', useValue })
