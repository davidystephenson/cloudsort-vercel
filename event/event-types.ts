import { Prisma } from '@prisma/client'
import { CHOICE_RELATION, EVENTS_RELATION, EVENT_ITEM_DATA_RELATION, EVENT_ITEM_RELATION, EVENT_RELATION, IMPORT_RELATION, RANDOM_RELATION } from './event-constants'
import { HistoryData, HistoryMapper } from '@/mergeChoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'

export type ChoiceRelation = typeof CHOICE_RELATION
export type EventRelation = typeof EVENT_RELATION
export type EventsRelation = typeof EVENTS_RELATION
export type EventItemRelation = typeof EVENT_ITEM_RELATION
export type EventItemDataRelation = typeof EVENT_ITEM_DATA_RELATION
export type ImportRelation = typeof IMPORT_RELATION
export type RandomRelation = typeof RANDOM_RELATION
export type RelatedEvent = Prisma.EventGetPayload<EventRelation>
export type RelatedEventItem = Prisma.EventItemGetPayload<EventItemRelation>
export type EventDataModeler = (props: {
  event: RelatedEvent
}) => HistoryData<ListMovie>
export type EventDataModelers = HistoryMapper<ListMovie, EventDataModeler>
