import { useList } from '@/list/list-context'
import { useMovie } from '@/movie/movie-context'
import contextCreator from 'context-creator'
import { useHotkeys } from 'react-hotkeys-hook'

export const {
  useContext: useOption,
  Provider: OptionProvider
} = contextCreator({
  name: 'option',
  useValue: (props: {
    chooseLetter: string
    index: number
    openLetter: string
  }) => {
    const movie = useMovie()
    const list = useList()
    async function choose (): Promise<void> {
      console.log('choosing...')
      await list.choose({ betterIndex: props.index, movieId: movie.calculated.id })
    }
    useHotkeys(props.openLetter, () => {
      void movie.open()
    })

    const value = {
      choose,
      chooseLetter: props.chooseLetter,
      openLetter: props.openLetter
    }
    return value
  }
})
