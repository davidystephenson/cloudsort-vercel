import { ListSnapshot } from '@/list/list-types'

export interface RestorePoint {
  episodeId: number
  listSnapshot: ListSnapshot
}
