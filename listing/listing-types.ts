import { RankedMovie } from '@/movie/movie-types'

export type Listing = RankedMovie[]
export interface ListingPayload { listing: Listing }
