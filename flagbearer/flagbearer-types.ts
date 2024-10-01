export interface Flagbearer {
  raised: boolean
  lower: () => void
  raise: () => void
  toggle: () => void
}
