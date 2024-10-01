// export type ActorInput<K, V> = { type: K } & V
// export type Actor<K, V> = (input: ActorInput<K, V>) => void
// export type Actors<ActorMap extends object> = {
//   [K in keyof ActorMap]: Actor<K, ActorMap[K]>
// }
// export type MarionInput<T extends object> = { type: keyof T } & T[keyof T]

// export default function marion<T extends object> (
//   actors: Actors<T>,
//   input: MarionInput<T>
// ): void {
//   const actor = actors[input.type]
//   actor(input)
// }

// // interface Alpha { type: 'alpha', count: number }
// // interface Beta { type: 'beta', label: string }
// // const alphaBeta = {
// //   alpha: (input: Alpha) => console.log(input.count),
// //   beta: (input: Beta) => console.log(input.label)
// // }
// // const alpha: Alpha = { type: 'alpha', count: 42 }
// // marion(alphaBeta, alpha)

// // interface Gamma { type: 'gamma', flag: boolean }
// // interface Delta { type: 'delta', handler: () => void }
// // const gammaDelta = {
// //   gamma: (input: Gamma) => console.log(input.flag),
// //   delta: (input: Delta) => input.handler()
// // }
// // const gamma: Gamma = { type: 'gamma', flag: true }
// // marion(gammaDelta, gamma)

// // function audition<T extends object> (
// //   actors: Actors<T>
// // ): <K extends keyof T>(input: { type: K } & T[K]) => void {
// //   return input => {
// //     marion(actors, input)
// //   }
// // }
// // const lower = audition(alphaBeta)
// // lower(alpha)

// // interface AlphaBeta {
// //   alpha: Alpha
// //   beta: Beta
// // }
// // export function marionAlphaBeta (
// //   actors: Actors<AlphaBeta>
// // ): (input: Alpha | Beta) => void {
// //   return audition(actors)
// // }
