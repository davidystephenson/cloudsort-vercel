export interface RequestState <Props, ResponseBody = void> {
  error: Error | undefined
  loading: boolean
  send: (props: Props) => Promise<ResponseBody>
}
export interface AuthProps {
  email: string
  password: string
}
export interface CreateListProps {
  name: string
}
export interface ButtonContextValue {
  loading: boolean
  error?: string | undefined
}

export interface Store {
  createList: RequestState<CreateListProps>
  login: RequestState<AuthProps>
  register: RequestState<AuthProps>
  shade?: string
}
