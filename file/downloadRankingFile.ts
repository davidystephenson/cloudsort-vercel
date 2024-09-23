import { Ranking } from '@/ranking/rankingTypes'
import { mkConfig, generateCsv, asString } from 'export-to-csv'
import downloadFile from './downloadFile'

export default function downloadRankingFile (props: {
  listId: number
  listName: string
  ranking: Ranking
}): void {
  const ranks = props.ranking.map(movie => movie.rank)
  const maximumRank = Math.max(...ranks)
  const rows = props.ranking.map(movie => {
    const score = maximumRank - movie.rank
    const row = {
      ' Film Name': movie.name,
      ' Year': movie.year,
      ' Date Rated': '',
      ' Mini Review': '',
      ' URL': '',
      ' IMDB ID': movie.imdbId,
      Score: score
    }
    return row
  })
  const csvConfig = mkConfig({ useKeysAsHeaders: true })
  const generate = generateCsv(csvConfig)
  const csv = generate(rows)
  const string = asString(csv)
  // const lined = addNewLine(string)
  downloadFile({
    extension: 'csv',
    label: 'ranking',
    listId: props.listId,
    listName: props.listName,
    text: string
  })
}
