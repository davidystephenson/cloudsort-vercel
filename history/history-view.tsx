import EpisodesView from '../episode/episodes-view'
import HistoryHeadingView from './history-heading-view'

export default function HistoryView (): JSX.Element {
  const view = (
    <>
      <HistoryHeadingView />
      <EpisodesView />
    </>
  )
  return view
}
