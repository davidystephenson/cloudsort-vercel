import OptionChooseView from './option-choose-view'
import DeleteMovieButtonView from '@/movie/delete-movie-button-view'
import { useOption } from './option-context'

export default function OptionConsumer (): JSX.Element {
  const option = useOption()

  if (option.index === 0) {
    return (
      <>
        <DeleteMovieButtonView />
        <OptionChooseView />
      </>
    )
  }

  return (
    <>
      <OptionChooseView />
      <DeleteMovieButtonView />
    </>
  )
}
