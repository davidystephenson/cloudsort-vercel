import privateListContext from '@/list/private-list-context'
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
    const list = privateListContext.useContext()
    function choose (): void {
      list.choice.choose({ betterIndex: props.index })
    }
    useHotkeys(props.openLetter, () => {
      void movie.open()
    })
    useHotkeys(props.chooseLetter, choose)
    const a = list.state.choice?.aIndex === props.index
    const value = {
      a,
      choose,
      chooseLetter: props.chooseLetter,
      index: props.index,
      openLetter: props.openLetter
    }
    return value
  }
})
