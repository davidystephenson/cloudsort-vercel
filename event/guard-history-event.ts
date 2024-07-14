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
  archive?: HistoryArchiveData<ListItem>
}
export interface HistoryChoicePart<ListItem extends Item> {
  choice?: HistoryChoiceData<ListItem>
}
export interface HistoryImportPart<ListItem extends Item> {
  import?: HistoryImportData<ListItem>
}
export interface HistoryRandomPart<ListItem extends Item> {
  random?: HistoryRandomData<ListItem>
}
export interface HistoryRemovePart<ListItem extends Item> {
  remove?: HistoryRemoveData<ListItem>
}
export interface HistoryResetPart<ListItem extends Item> {
  reset?: HistoryResetData<ListItem>
}
export interface HistoryUnarchivePart<ListItem extends Item> {
  unarchive?: HistoryUnarchiveData<ListItem>
}
export interface HistoryEvent<ListItem extends Item> extends Identity, HistoryArchivePart<ListItem>, HistoryChoicePart<ListItem>, HistoryImportPart<ListItem>, HistoryRandomPart<ListItem>, HistoryRemovePart<ListItem>, HistoryResetPart<ListItem>, HistoryUnarchivePart<ListItem> {
  createdAt: number
}

export default function guardHistoryEvent (props: {
  label: string
  value: unknown
}): void {
  const
}
