import { ReactNode } from 'react'

export interface ContextCreation <ContextValue, ProviderProps> {
  useCreatedContext: () => ContextValue
  ContextProvider: React.FC<{ children: ReactNode } & ProviderProps>
}
