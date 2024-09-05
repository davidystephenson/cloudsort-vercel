import { RankedMovie } from '@/movie/movie-types'

export type Ranking = RankedMovie[]
export interface RankingPayload { ranking: Ranking }
