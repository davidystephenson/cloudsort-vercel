'use client'
import { useList } from '@/list/list-context'
import { Virtuoso } from 'react-virtuoso'
import HistoryEventView from './history-event-view'
import historyEventContext from './history-event-context'
import useMounted from '@/mounted/use-mounted'
import { useState } from 'react'
import ThemeButtonView from '@/theme/theme-button-view'

export default function HistoryEventsView (): JSX.Element {
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
    return (
      <>
        <ThemeButtonView onClick={open}>Open</ThemeButtonView>
        <historyEventContext.Provider event={first}>
          <HistoryEventView />
        </historyEventContext.Provider>
      </>
    )
  }
  function close (): void {
    setOpened(false)
  }
  return (
    <>
      <ThemeButtonView onClick={close}>Close</ThemeButtonView>
      <Virtuoso
        style={{ height: 200 }}
        data={list.state.history}
        itemContent={(_, event) => {
          console.log('event', event)
          return (
            <historyEventContext.Provider event={event}>
              <HistoryEventView />
            </historyEventContext.Provider>
          )
        }}
      />
    </>
  )
}
