import { List, Movie, Prisma } from '@prisma/client'
import { State } from '../mergeChoice/merge-choice-types'

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
    choices: true
  }
}>
export interface MergechoiceList {
  list: RelatedList
  state: State<Movie>
}
