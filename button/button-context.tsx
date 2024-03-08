import { ButtonContextValue } from './button-types'
import contextCreator from 'context-creator'

export const {
  useContext: useButtonContext,
  Provider: ButtonProvider
} = contextCreator({
  name: 'button',
  useValue: (props: ButtonContextValue) => {
    const value = {
      ...props
    }
    return value
  }
})
