'use client'
import { Virtuoso } from 'react-virtuoso'
import EpisodeConsumer from './episode-consumer'
import episodeContext from './episode-context'
import useMounted from '@/mounted/use-mounted'
import { useState } from 'react'
import ThemeButtonView from '@/theme/theme-button-view'
import privateListContext from '@/list/private-list-context'

export default function EpisodesView (): JSX.Element {
  const privateList = privateListContext.useContext()
  const mounted = useMounted()
  const [opened, setOpened] = useState(false)
  if (!mounted || !opened) {
    const first = privateList.state.history[0]
    if (first == null) {
      return <></>
    }
    function open (): void {
      setOpened(true)
    }
    const view = (
      <>
        <ThemeButtonView onClick={open}>Open</ThemeButtonView>
        <episodeContext.Provider episode={first}>
          <EpisodeConsumer />
        </episodeContext.Provider>
      </>
    )
    return view
  }
  function close (): void {
    setOpened(false)
  }
  const view = (
    <>
      <ThemeButtonView onClick={close}>Close</ThemeButtonView>
      <Virtuoso
        style={{ height: 200 }}
        data={privateList.state.history}
        itemContent={(_, episode) => {
          return (
            <episodeContext.Provider episode={episode}>
              <EpisodeConsumer />
            </episodeContext.Provider>
          )
        }}
      />
    </>
  )
  return view
}
