export interface Filter <Item> {
  sift: (props: { query: string | undefined }) => void
  filtered: Item[]
}
