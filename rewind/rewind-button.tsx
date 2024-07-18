import episodeContext from '@/episode/episode-context'
import ThemeButtonView from '@/theme/theme-button-view'

export default function RewindButton (): JSX.Element {
  const episode = episodeContext.useContext()
  function handleRewind (): void {
    episode.rewind()
  }
  const button = (
    <ThemeButtonView onClick={handleRewind}>Rewind</ThemeButtonView>
  )
  return button
}
