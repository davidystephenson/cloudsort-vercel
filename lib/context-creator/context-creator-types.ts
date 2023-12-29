import { ReactNode } from 'react'

export interface ContextCreation <ContextValue, ProviderProps> {
  useCreatedContext: () => ContextValue
  CreatedProvider: React.FC<{ children: ReactNode } & ProviderProps>
}
