export interface Filter <Item> {
  filter: (props: { query: string | undefined }) => void
  filtered: Item[]
}
