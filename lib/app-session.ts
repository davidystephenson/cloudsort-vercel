import nextAppSession from 'next-app-session'

// Your session data type
interface MySessionData {
  newTheme: string
}

// Setup the config for your session and cookie
export const getAppSession = nextAppSession<MySessionData>({})
