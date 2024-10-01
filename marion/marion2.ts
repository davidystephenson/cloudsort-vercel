// export type ActorInput<K, I> = { type: K } & I
// export type Actor<K extends keyof O & keyof I, I, O> =
//   (input: ActorInput<K, I>) => O

// export type Actors<I extends object, O extends object, K extends keyof O & keyof I> = {
//   [T in K]: Actor<keyof O[T] & keyof I[T], I[T], O[T]>;
// }

// // Create a type that maps types to their corresponding outputs
// export type MarionInput<I extends object> = { type: keyof I } & I[keyof I]

// // Update the marion function to return the output type based on the actor's return type
// export default function marion<I extends object, O extends { [K in keyof I]: O[K] }, K extends keyof I & keyof O> (
//   actors: Actors<I, O, K>,
//   input: MarionInput<I>
// ): O[K] {
//   const actor = actors[input.type]
//   // Call the actor with the input and return the output
//   return actor(input)
// }

// // Example Interfaces
// interface Alpha { type: 'alpha', count: number }
// interface Beta { type: 'beta', label: string }

// // Corresponding Outputs
// interface Outputs {
//   alpha: void
//   beta: string
// }

// // Define the actors
// const alphaBeta: Actors<{ alpha: Alpha, beta: Beta }, Outputs> = {
//   alpha: (input: Alpha) => {
//     console.log(input.count);
//      // Output is void
//   },
//   beta: (input: Beta) => {
//     console.log(input.label)
//     return input.label // Output is string
//   }
// }

// // Example Usage
// const alpha: Alpha = { type: 'alpha', count: 42 }
// marion(alphaBeta, alpha) // Output is void

// const beta: Beta = { type: 'beta', label: 'Hello' }
// const result = marion(alphaBeta, beta) // Output is string
// console.log(result) // "Hello"
