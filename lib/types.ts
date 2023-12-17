export interface RequestState <Props, ResponseBody = void> {
  error: Error | undefined
  loading: boolean
  send: (props: Props) => Promise<ResponseBody>
}
export interface AuthProps {
  email: string
  password: string
}
export interface Store {
  login: RequestState<AuthProps>
  register: RequestState<AuthProps>
}
