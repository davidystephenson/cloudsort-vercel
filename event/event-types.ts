import { HandledResponse, SuccessPayload } from '@/handle/handle-types'
import { ListRequest } from '@/list/list-types'
import { HistoryEvent } from '@/mergeChoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { Prisma } from '@prisma/client'
import { CHOICE_RELATION, EVENTS_RELATION, EVENT_ITEM_DATA_RELATION, EVENT_ITEM_RELATION, EVENT_RELATION, IMPORT_RELATION, RANDOM_RELATION } from './event-constants'
import { Part } from '@/mergeChoice/marion/marionTypes'

export type ChoiceRelation = typeof CHOICE_RELATION
export type EventRelation = typeof EVENT_RELATION
export type EventsRelation = typeof EVENTS_RELATION
export interface EventRequest extends ListRequest { lastMergechoiceId: number }
export type EventItemRelation = typeof EVENT_ITEM_RELATION
export type EventItemDataRelation = typeof EVENT_ITEM_DATA_RELATION
export type EventPart = Part<RelatedEvent>
export type EventResponse = HandledResponse<{ event: HistoryEvent<ListMovie> }>
export type HistoryEventResponse = SuccessPayload<{ event: HistoryEvent<ListMovie> }>
export type ImportRelation = typeof IMPORT_RELATION
export type MovieHistoryEvent = HistoryEvent<ListMovie>
export type RandomRelation = typeof RANDOM_RELATION
export type RelatedArchive = Prisma.ArchiveGetPayload<EventItemDataRelation>
export type RelatedChoice = Prisma.ChoiceGetPayload<ChoiceRelation>
export type RelatedImport = Prisma.ImportGetPayload<ImportRelation>
export type RelatedRandom = Prisma.RandomGetPayload<RandomRelation>
export type RelatedRemove = Prisma.RemoveGetPayload<EventItemDataRelation>
export type RelatedReset = Prisma.ResetGetPayload<EventItemDataRelation>
export type RelatedUnarchive = Prisma.UnarchiveGetPayload<EventItemDataRelation>
export type RelatedEvent = Prisma.EventGetPayload<EventRelation>
export type RelatedEventItem = Prisma.EventItemGetPayload<EventItemRelation>
