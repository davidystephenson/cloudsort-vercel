export interface Sifter <Item> {
  query?: string
  reset: () => void
  sift: (props: { query: string | undefined }) => void
  sifted: Item[]
}
