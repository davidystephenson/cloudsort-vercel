import MovieLabelView from '@/movie/movie-label-view'
import RequestButtonView from '@/request/request-button-view'
import { useOption } from './option-context'
import { useRef } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

export default function OptionChooseView (): JSX.Element {
  const ref = useRef<HTMLButtonElement>(null)
  const option = useOption()
  useHotkeys(option.chooseLetter, () => {
    ref.current?.click()
  })
  async function send (): Promise<void> {
    option.choose()
  }
  return (
    <RequestButtonView ref={ref} send={send}>
      [{option.chooseLetter}]
      {' '}
      <MovieLabelView />
    </RequestButtonView>
  )
}
