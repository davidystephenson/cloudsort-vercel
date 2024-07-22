export interface Flagbearer {
  flag: boolean
  lower: () => void
  raise: () => void
  toggle: () => void
}
