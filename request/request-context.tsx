import contextCreator from 'context-creator'
import { ActionProvider, useAction } from '../action/action-context'
import { AxiosError } from 'axios'

export const {
  useContext: useRequest,
  Provider: RequestProvider
} = contextCreator({
  name: 'request',
  useValue: (props: {
    send: () => Promise<void>
    endless?: boolean
  }) => {
    const action = useAction()
    async function sendRequest (): Promise<void> {
      action.start()
      try {
        await props.send()
      } catch (error) {
        if (error instanceof AxiosError) {
          action.fail({ error, message: error.response?.data?.error })
        } else if (error instanceof Error) {
          action.fail({ error })
        }
        throw error
      }
      if (props.endless === true) {
        return
      }
      action.succeed()
    }
    const value = {
      ...action,
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
