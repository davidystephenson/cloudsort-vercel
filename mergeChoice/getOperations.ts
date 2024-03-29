import range from './range'
import { Operation, OperationDictionary } from './merge-choice-types'
import arrayToDictionary from './arrayToDictionary'
import createOperation from './createOperation'

export default function getOperations (props: {
  activeOperations: OperationDictionary
}): OperationDictionary {
  const values = Object.values(props.activeOperations)
  const blocks = values.map(operation => operation.output)
  blocks.sort((a, b) => b.length - a.length)
  const newOperations: Operation[] = []
  const pairsCount = Math.floor(blocks.length / 2)
  const pairsRange = range(pairsCount)
  pairsRange.forEach(() => {
    const blockA = blocks.pop()
    if (blockA == null) {
      throw new Error('blockA is null')
    }
    const blockB = blocks.pop()
    if (blockB == null) {
      throw new Error('blockB is null')
    }
    const newOperation = createOperation({
      input: [blockA, blockB]
    })
    newOperations.unshift(newOperation)
  })
  if (blocks.length === 1) {
    const output = blocks.pop()
    if (output == null) {
      throw new Error('output is null')
    }
    const newOperation = createOperation({ output })
    newOperations.push(newOperation)
  }
  const dictionary = arrayToDictionary({ array: newOperations })
  return dictionary
}
