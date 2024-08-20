'use client'

import { ListMovie } from '@/movie/movie-types'
import { useTheme } from '@/theme/theme-context'
import { State } from '../mergechoice/mergeChoiceTypes'
import ListMultiloaderView from './list-multiloader-view'
import PrivateListConsumer from './private-list-consumer'
import privateListContext from './private-list-context'

export default function PrivateListView (props: {
  // history: Array<Episode<ListMovie>>
  state: State<ListMovie>
  seed: string
}): JSX.Element {
  const theme = useTheme()
  // const [index, setIndex] = useState(0)
  // const [state, setState] = useState<State<ListMovie>>()
  // const deduceAction = useAction()
  // const deduceWorkerRef = useRef<Worker>()
  // useEffect(() => {
  //   deduceWorkerRef.current = new Worker(new URL('../deduce/deduce-worker.ts', import.meta.url))
  //   deduceWorkerRef.current.onmessage = (event: MessageEvent<DeduceMessage>) => {
  //     const handlers: DeduceHandlers = {
  //       episode: (props) => {
  //         setIndex(props.message.index)
  //       },
  //       state: (props) => {
  //         setState(props.message.state)
  //       }
  //     }
  //     handleDeduce({
  //       key: event.data.type,
  //       message: event.data,
  //       receivers: handlers
  //     })
  //     deduceAction.succeed()
  //   }
  //   return () => {
  //     deduceWorkerRef.current?.terminate()
  //   }
  // }, [deduceAction.succeed])
  // useEffect(() => {
  //   deduceWorkerRef.current?.postMessage({
  //     history: props.state.history,
  //     seed: props.seed
  //   })
  // }, [])
  if (!theme.mounted) {
    return <ListMultiloaderView />
  }
  // if (state == null) {
  //   return (
  //     <DeducingView index={index} length={props.state.history.length} />
  //   )
  // }
  return (
    <privateListContext.Provider state={props.state}>
      <PrivateListConsumer />
    </privateListContext.Provider>
  )
}
