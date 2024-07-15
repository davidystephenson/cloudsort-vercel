import range from './range'

export default function shuffle<Element> (
  array: Element[]
): Element[] {
  const indices = range(array.length)
  const randoms = indices.map(() => Math.random())
  indices.sort((i, j) => randoms[i] - randoms[j])
  const shuffled = indices.map(i => array[i])
  return shuffled
}
