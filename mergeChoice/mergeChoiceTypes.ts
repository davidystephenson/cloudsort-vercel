export type ItemId = number | string
export interface Identity {
  mergeChoiceId: number
}
export interface Item {
  id: ItemId
  seeding: boolean
  name: string
  seed?: number
}
export type Calculated<T> = T & { points: number }
export interface Operation extends Identity {
  input: ItemId[][]
  output: ItemId[]
  priority: number
}
export interface ChoiceData {
  options: ItemId[]
  operationMergeChoiceId?: number | null
  aIndex: number
  bIndex: number
  random: boolean
}
export type Choice = ChoiceData & Identity
export type OperationDictionary = Record<number, Operation>
export type ItemDictionary<ListItem> = Record<ItemId, ListItem>
export interface State<ListItem extends Item> {
  activeIds: ItemId[]
  activeOperations: OperationDictionary
  archive: ItemDictionary<ListItem>
  betterIds: ItemId[]
  betterOperations: OperationDictionary
  choice?: Choice
  choiceCount: number
  complete: boolean
  history: Array<HistoryEvent<ListItem>>
  items: ItemDictionary<ListItem>
  operationCount: number
  reserveIds: ItemId[]
  seed: string
  worseIds: ItemId[]
  worseOperations: OperationDictionary
}

export interface HistoryItemData<ListItem extends Item> {
  item: Calculated<ListItem>
}
export interface HistoryArchiveData<ListItem extends Item> extends HistoryItemData<ListItem> { }
export interface HistoryRemoveData<ListItem extends Item> extends HistoryItemData<ListItem> { }
export interface HistoryResetData<ListItem extends Item> extends HistoryItemData<ListItem> { }
export interface HistoryUnarchiveData<ListItem extends Item> extends HistoryItemData<ListItem> { }
export interface HistoryChoiceData<ListItem extends Item> {
  aBetter: boolean
  aId: ItemId
  aItem: Calculated<ListItem>
  betterIndex: number
  bId: ItemId
  bItem: Calculated<ListItem>
  random: boolean
  seeded: boolean
}
export interface HistoryImportData<ListItem extends Item> {
  items: Array<Calculated<ListItem>>
}
export interface HistoryRandomData<ListItem extends Item> {
  first: Calculated<ListItem>
  second: Calculated<ListItem>
}
export interface HistoryArchivePart <ListItem extends Item> {
  archive?: HistoryArchiveData<ListItem> | null
}
export interface HistoryChoicePart<ListItem extends Item> {
  choice?: HistoryChoiceData<ListItem> | null
}
export interface HistoryImportPart<ListItem extends Item> {
  import?: HistoryImportData<ListItem> | null
}
export interface HistoryRandomPart<ListItem extends Item> {
  random?: HistoryRandomData<ListItem> | null
}
export interface HistoryRemovePart<ListItem extends Item> {
  remove?: HistoryRemoveData<ListItem> | null
}
export interface HistoryResetPart<ListItem extends Item> {
  reset?: HistoryResetData<ListItem> | null
}
export interface HistoryUnarchivePart<ListItem extends Item> {
  unarchive?: HistoryUnarchiveData<ListItem> | null
}
export interface HistoryEvent<ListItem extends Item> extends Identity, HistoryArchivePart<ListItem>, HistoryChoicePart<ListItem>, HistoryImportPart<ListItem>, HistoryRandomPart<ListItem>, HistoryRemovePart<ListItem>, HistoryResetPart<ListItem>, HistoryUnarchivePart<ListItem> {
  createdAt: number | null
}
export interface UnknownParts {
  archive?: unknown
  choice?: unknown
  import?: unknown
  random?: unknown
  remove?: unknown
  reset?: unknown
  unarchive?: unknown
}
export interface Parts<P extends UnknownParts> {
  archive?: P['archive']
  choice?: P['choice']
  import?: P['import']
  random?: P['random']
  remove?: P['remove']
  reset?: P['reset']
  unarchive?: P['unarchive']
}
export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]
export type Part <P extends Parts<P>,> = NonNullable<AtLeastOne<P>>
export type HistoryDataPart<ListItem extends Item> = Part<HistoryEvent<ListItem>>

export type Input<P extends UnknownParts, K extends keyof P> = NonNullable<P[K]>
export type Actor<Complement, O, P extends UnknownParts, K extends keyof P> = (props: Complement & {
  input: Input<P, K>
}) => O
export type Actors<Complement, O, P extends UnknownParts> = {
  [K in keyof P]: Actor<Complement, O, P, K>
}
export type PartListItem<P extends HistoryDataPart<any>> = P extends HistoryDataPart<infer T> ? T : unknown

export interface RemovalFromOperations {
  emptiedOperationId?: ItemId
  operations: OperationDictionary
}
export interface CountRange {
  maximum: number
  minimum: number
}
export interface Population<ListItem extends Item> {
  state: State<ListItem>
  items: ListItem[]
}
export interface Prioritized {
  priority: number
}
export type StoredState<ListItem extends Item> = Pick<State<ListItem>, 'seed' | 'history'>
