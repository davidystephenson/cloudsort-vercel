import contextCreator from 'context-creator'
import { ActionProvider, useActionContext } from '../action/action-context'

export const {
  useContext: useRequest,
  Provider: RequestProvider
} = contextCreator({
  name: 'request',
  useValue: (props: {
    send: () => Promise<void>
    endless?: boolean
  }) => {
    const action = useActionContext()
    async function sendRequest (): Promise<void> {
      action.start()
      try {
        await props.send()
      } catch (error) {
        if (!(error instanceof Error)) {
          throw error
        }
        action.fail({ error })
      }
      if (props.endless === true) {
        return
      }
      action.succeed()
    }
    const value = {
      ...action,
      acting: action.acting,
      send: sendRequest
    }
    return value
  },
  Wrapper: (props) => {
    return (
      <ActionProvider>
        {props.children}
      </ActionProvider>
    )
  }
})
