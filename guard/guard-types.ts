
export type ArrayMap <Arrayed extends unknown[], Props> = {
  [Index in keyof Arrayed]: (props: Props) => Arrayed[Index]
}
