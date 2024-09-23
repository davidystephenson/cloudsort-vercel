import { Ranking } from '@/ranking/rankingTypes'
import { mkConfig, generateCsv, asString } from 'export-to-csv'
import downloadFile from './downloadFile'

export default function downloadCritickerFile (props: {
  listId: number
  listName: string
  ranking: Ranking
}): void {
  const maximumRank = props.ranking.reduce((maximum, row) => {
    return Math.max(maximum, row.rank)
  }, 0)
  const normalized = props.ranking.map(movie => {
    const rating = maximumRank - movie.rank
    const normalRating = Math.round(rating * 100 / maximumRank)
    const normalized = {
      imdb_id: movie.imdbId,
      rating: normalRating
    }
    return normalized
  })
  const csvConfig = mkConfig({ useKeysAsHeaders: true })
  const generate = generateCsv(csvConfig)
  const csv = generate(normalized)
  const string = asString(csv)
  downloadFile({
    extension: 'csv',
    label: 'criticker',
    listId: props.listId,
    listName: props.listName,
    text: string
  })
}
