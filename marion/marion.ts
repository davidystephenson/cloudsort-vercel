export type ActorInput<K, I> = { type: K } & I
export type Actor<K extends keyof O & keyof I, I, O> = (input: ActorInput<K, I[K]>) => O[K]
export type Actors<I extends object, O extends { [K in keyof I]: O[K] }, K extends keyof O & keyof I> = {
  [T in K]: Actor<T, I, O>;
}
export type MarionInput<
  I extends object,
  O extends { [K in keyof I]: O[K] },
  K extends keyof I & keyof O
> = { type: K } & I[K]

export default function marion<I extends object, O extends { [K in keyof I]: O[K] }, K extends keyof I & keyof O> (
  actors: Actors<I, O, K>,
  input: MarionInput<I, O, K>
): O[K] {
  const actor = actors[input.type]
  return actor(input)
}

interface Alpha { type: 'alpha', count: number }
interface Beta { type: 'beta', label: string }

const alphaBeta = {
  alpha: (input: Alpha) => {
    console.log(input.count)
  },
  beta: (input: Beta) => {
    return input.label
  }
}

const alpha: Alpha = { type: 'alpha', count: 42 }
const x = marion(alphaBeta, alpha)
void x

const beta: Beta = { type: 'beta', label: 'Hello' }
const result = marion(alphaBeta, beta) // Output is string
console.log(result) // "Hello"
