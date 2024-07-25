export interface Sifter <Item> {
  sift: (props: { query: string | undefined }) => void
  sifted: Item[]
}
