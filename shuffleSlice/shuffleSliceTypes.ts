export interface Always {
  always: true
  never?: false
}
export interface Never {
  always?: false
  never: true
}
export interface Neither {
  always?: undefined
  never?: undefined
}
export type AlwaysNever = Always | Never | Neither
