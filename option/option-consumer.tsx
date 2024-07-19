import OptionChooseView from './option-choose-view'
import { useOption } from './option-context'
import ListMovieMenuView from '@/list/list-movie-menu-view'

export default function OptionConsumer (): JSX.Element {
  const option = useOption()

  if (option.index === 0) {
    return (
      <>
        <ListMovieMenuView />
        <OptionChooseView />
      </>
    )
  }

  return (
    <>
      <OptionChooseView />
      <ListMovieMenuView />
    </>
  )
}
