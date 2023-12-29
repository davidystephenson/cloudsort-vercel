import { contextCreator } from '../context-creator/context-creator'
import { ButtonContextValue } from './button-types'

function useValue (props: ButtonContextValue): ButtonContextValue {
  const value: ButtonContextValue = {
    ...props
  }
  return value
}

export const {
  useCreatedContext: useButtonContext,
  CreatedProvider: ButtonProvider
} = contextCreator({ name: 'button', useValue })
