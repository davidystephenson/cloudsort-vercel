import { HandledResponse, SuccessPayload } from '@/handle/handle-types'
import { ListRequest } from '@/list/list-types'
import { Episode } from '@/mergeChoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { Prisma } from '@prisma/client'
import { CHOICE_RELATION, EPISODES_RELATION, EPISODE_ITEM_DATA_RELATION, EPISODE_ITEM_RELATION, EPISODE_RELATION, IMPORT_RELATION, RANDOM_RELATION } from './event-constants'
import { Part } from '@/mergeChoice/marion/marionTypes'

export type ChoiceRelation = typeof CHOICE_RELATION
export type EpisodeRelation = typeof EPISODE_RELATION
export type EpisodesRelation = typeof EPISODES_RELATION
export interface EpisodeRequest extends ListRequest { lastMergechoiceId: number }
export type EpisodeItemRelation = typeof EPISODE_ITEM_RELATION
export type EpisodeItemDataRelation = typeof EPISODE_ITEM_DATA_RELATION
export type EpisodePart = Part<RelatedEpisode>
export type EpisodeResponse = HandledResponse<{ episode: Episode<ListMovie> }>
export type HistoryEpisodeResponse = SuccessPayload<{ episode: Episode<ListMovie> }>
export type ImportRelation = typeof IMPORT_RELATION
export type MovieEpisode = Episode<ListMovie>
export type RandomRelation = typeof RANDOM_RELATION
export type RelatedArchive = Prisma.ArchiveGetPayload<EpisodeItemDataRelation>
export type RelatedChoice = Prisma.ChoiceGetPayload<ChoiceRelation>
export type RelatedImport = Prisma.ImportGetPayload<ImportRelation>
export type RelatedRandom = Prisma.RandomGetPayload<RandomRelation>
export type RelatedRemove = Prisma.RemoveGetPayload<EpisodeItemDataRelation>
export type RelatedReset = Prisma.ResetGetPayload<EpisodeItemDataRelation>
export type RelatedUnarchive = Prisma.UnarchiveGetPayload<EpisodeItemDataRelation>
export type RelatedEpisode = Prisma.EpisodeGetPayload<EpisodeRelation>
export type RelatedEpisodeItem = Prisma.EpisodeItemGetPayload<EpisodeItemRelation>
