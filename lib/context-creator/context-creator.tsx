import { createContext, useContext, ReactNode } from 'react'
import { ContextCreation } from './context-creator-types'
export function contextCreator <ContextValue, ProviderProps> (props: {
  useValue: (props: ProviderProps) => ContextValue
}): ContextCreation<ContextValue, ProviderProps> {
  const createdContext = createContext<ContextValue | undefined>(undefined)

  function useCreatedContext (): ContextValue {
    const value = useContext(createdContext)
    if (value == null) {
      throw new Error('useCreatedContext must be used within a ContextProvider')
    }
    return value
  }

  function CreatedProvider (providerProps: {
    children: ReactNode
  } & ProviderProps): JSX.Element {
    const value = props.useValue(providerProps)
    return (
      <createdContext.Provider value={value}>
        {providerProps.children}
      </createdContext.Provider>
    )
  }

  return {
    useCreatedContext,
    CreatedProvider
  }
}
