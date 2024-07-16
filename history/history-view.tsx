import HistoryEpisodesView from './history-events-view'
import HistoryHeadingView from './history-heading-view'

export default function HistoryView (): JSX.Element {
  const view = (
    <>
      <HistoryHeadingView />
      <HistoryEpisodesView />
    </>
  )
  return view
}
