import { Ranking } from '@/ranking/rankingTypes'
import siftMovie from '@/movie/sift-movie'
import useSifter from '@/sifter/use-sifter'
import { List } from '@prisma/client'
import contextCreator from 'context-creator'
import { useCallback } from 'react'
import downloadCritickerFile from '@/file/downloadCritickerFile'

const publicListContext = contextCreator({
  name: 'publicListContext',
  useValue: (props: {
    list: List
    ranking: Ranking
  }) => {
    const _export = useCallback(() => {
      downloadCritickerFile({
        listId: props.list.id,
        listName: props.list.name,
        ranking: props.ranking
      })
    }, [])
    const moviesSifter = useSifter({
      rows: props.ranking,
      sift: siftMovie
    })
    const value = {
      export: _export,
      list: props.list,
      ranking: props.ranking,
      moviesSifter
    }
    return value
  }
})
export default publicListContext
