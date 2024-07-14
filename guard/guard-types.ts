export type ArrayMap <Arrayed extends unknown[], Props> = {
  [Index in keyof Arrayed]: (props: Props) => Arrayed[Index]
}
export type Guard<T> = (props: {
  label: string
  value: unknown
}) => T
export type GuardArray <Guards extends unknown[]> = ArrayMap<Guards, {
  label: string
  value: unknown
}>
export type Guards<Guarded> = {
  [Key in keyof Guarded]: GuardsValue<Guarded, Key>
}
export type GuardsValue<Guarded, Key extends keyof Guarded> = (
  KeyGuard<Guarded, Key> |
  KeyGuards<Guarded, Key> |
  KeyGuardArray<Guarded, Key>
)
export type KeyGuard<Guarded, Key extends keyof Guarded> = Guard<Guarded[Key]>
export type KeyGuardArray<Guarded, Key extends keyof Guarded> = Array<Guard<Guarded[Key]>>
export type KeyGuards<Guarded, Key extends keyof Guarded> = Guards<Guarded[Key]>
export interface Issue {
  key?: string
  label: string
  message: string
}
