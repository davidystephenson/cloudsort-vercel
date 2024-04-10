import { List, Movie, Prisma } from '@prisma/client'
import { State } from '../mergeChoice/mergeChoiceTypes'

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
    movieReservations: true
    choices: {
      include: {
        options: true
      }
    }
  }
}>
export interface MergechoiceList {
  list: RelatedList
  state: State<Movie>
}
