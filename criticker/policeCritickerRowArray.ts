import { CritickerRow } from './critickerRowTypes'
import guardArrayType from '@/fashion-police/guard-array-type'
import policeCritickerRow from './policeCritickerRow'

export default function policeCritickerRowArray (props: {
  label: string
  value: unknown
}): CritickerRow[] {
  const policed = guardArrayType({
    guard: policeCritickerRow,
    ...props
  })
  return policed
}
