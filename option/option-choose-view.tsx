import MovieLabelView from '@/movie/movie-label-view'
import { useOption } from './option-context'
import ButtonView from '@/button/button-view'

export default function OptionChooseView (): JSX.Element {
  const option = useOption()
  function handleClick (): void {
    option.choose()
  }
  return (
    <ButtonView onClick={handleClick} fontSize='md'>
      [{option.chooseLetter}]
      {' '}
      <MovieLabelView />
    </ButtonView>
  )
}
