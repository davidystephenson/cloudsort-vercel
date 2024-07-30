import contextCreator from 'context-creator'
import useAction from './use-action'

export const {
  useContext: useActionContext,
  useOptionalContext: useOptionalActionContext,
  Provider: ActionProvider
} = contextCreator({
  name: 'action',
  useValue: (props?: {
    action?: () => Promise<void>
    acting?: boolean
  }) => {
    const action = useAction(props)
    return action
  }
})
