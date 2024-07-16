'use client'
import { useList } from '@/list/list-context'
import { Virtuoso } from 'react-virtuoso'
import HistoryEpisodeView from './history-event-view'
import historyContext from './history-context'
import useMounted from '@/mounted/use-mounted'
import { useState } from 'react'
import ThemeButtonView from '@/theme/theme-button-view'

export default function HistoryEpisodesView (): JSX.Element {
  const list = useList()
  const mounted = useMounted()
  const [opened, setOpened] = useState(false)
  if (!mounted || !opened) {
    const first = list.state.history[0]
    if (first == null) {
      return <></>
    }
    function open (): void {
      setOpened(true)
    }
    const view = (
      <>
        <ThemeButtonView onClick={open}>Open</ThemeButtonView>
        <historyContext.Provider episode={first}>
          <HistoryEpisodeView />
        </historyContext.Provider>
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
        data={list.state.history}
        itemContent={(_, episode) => {
          console.log('episode', episode)
          return (
            <historyContext.Provider episode={episode}>
              <HistoryEpisodeView />
            </historyContext.Provider>
          )
        }}
      />
    </>
  )
  return view
}
