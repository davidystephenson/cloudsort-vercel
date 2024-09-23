import fashionPolice from '@/fashion-police/fashion-police'
import { CritickerRow } from './critickerRowTypes'
import guardString from '@/fashion-police/guard-string'

export default function policeCritickerRow (props: {
  label: string
  value: unknown
}): CritickerRow {
  const policed = fashionPolice({
    required: {
      ' Date Rated': guardString,
      ' Film Name': guardString,
      ' Year': guardString,
      ' Mini Review': guardString,
      ' URL': guardString,
      ' IMDB ID': guardString,
      Score: guardString
    },
    ...props
  })
  return policed
}
