import { Session } from 'next-auth'

export interface AuthContextValue {
  session: Session | null
}
