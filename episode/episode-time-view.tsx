import episodeContext from './episode-context'

export default function EpisodeTimeView (): JSX.Element {
  const episode = episodeContext.useContext()
  const date = new Date(episode.element.createdAt)
  const time = date.toLocaleTimeString()
  const view = <>{time}</>
  return view
}
