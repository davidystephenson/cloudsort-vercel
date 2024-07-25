import PrivateListMovieMenuView from '@/list/private-list-movie-menu-view'
import OptionChooseView from './option-choose-view'
import { useOption } from './option-context'

export default function OptionConsumer (): JSX.Element {
  const option = useOption()

  if (option.index === 0) {
    return (
      <>
        <PrivateListMovieMenuView />
        <OptionChooseView />
      </>
    )
  }

  return (
    <>
      <OptionChooseView />
      <PrivateListMovieMenuView />
    </>
  )
}
