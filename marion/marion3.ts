// export type ActorInput<K, I> = { type: K } & I
// export type Actor<K extends keyof O & keyof I, I, O> =
//   (input: ActorInput<K, I[K]>) => O[K]

// export default function marion<I extends object, O extends { [K in keyof I]: O[K] }, K extends keyof I & keyof O> (
//   actors: {
//     [T in K]: Actor<T, I, O>;
//   },
//   input: { type: K } & I[K]
// ): O[K] {
//   const actor = actors[input.type]
//   // Call the actor with the input and return the output
//   return actor(input)
// }

// // Example Interfaces
// interface Alpha { type: 'alpha', count: number }
// interface Beta { type: 'beta', label: string }

// // Define the actors
// const alphaBeta = {
//   alpha: (input: Alpha) => {
//     console.log(input.count)
//     // Output is void
//   },
//   beta: (input: Beta) => {
//     console.log(input.label)
//     return input.label // Output is string
//   }
// }

// // Example Usage
// const alpha: Alpha = { type: 'alpha', count: 42 }
// const x = marion(alphaBeta, alpha) // Output is void

// const beta: Beta = { type: 'beta', label: 'Hello' }
// const result = marion(alphaBeta, beta) // Output is string
// console.log(result) // "Hello"
