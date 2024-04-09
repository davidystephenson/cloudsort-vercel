import { List, Prisma } from '@prisma/client'
import { State } from '../mergeChoice/mergeChoiceTypes'
import { ListedMovie } from '@/movie/movie-types'

export interface ListWhere {
  listId: number
  userId?: number
}

export interface DeleteListBody {
  listId: number
}

export interface ListsContextValue {
  create: (props: { name: string }) => Promise<List>
  delete: (props: { id: number }) => void
  filter: (filterProps: { query: string | undefined }) => void
  filtered: List[]
  rows: List[]
}
export type RelatedList = Prisma.ListGetPayload<{
  include: {
    choices: {
      include: {
        options: true
      }
    }
    listMovies: {
      include: {
        movie: true
      }
    }
    movieReservations: true
    operations: {
      include: {
        inputs: {
          include: {
            inputMovies: true
          }
        }
        outputMovies: true
      }
    }
  }
}>
export type MovieState = State<ListedMovie>
export interface MergechoiceList {
  list: RelatedList
  state: MovieState
}
