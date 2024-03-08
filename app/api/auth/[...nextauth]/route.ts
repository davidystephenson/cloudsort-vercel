import NextAuth, { User, type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/prisma/prisma'
import { compare } from 'bcrypt'

if (process.env.NEXTAUTH_SECRET == null) {
  throw new Error('There is no NEXTAUTH_SECRET.')
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize (credentials) {
        const { email, password } = credentials ?? {}
        if (email == null || password == null) {
          throw new Error('Missing username or password')
        }
        const user = await prisma.user.findUnique({
          where: {
            email
          }
        })
        // if user doesn't exist or password doesn't match
        if ((user == null) || !(await compare(password, user.password))) {
          throw new Error('Invalid username or password')
        }
        const { id, ...clone } = user
        void id
        const uid = String(user.id)
        const u: User = {
          id: uid,
          ...clone
        }
        return u
      }

    })
  ],
  callbacks: {
    async session ({ session }) {
      if (session.user == null || session.user.email == null) {
        throw new Error('There is no email')
      }
      const dbUser = await prisma.user.findUnique({
        where: {
          email: session.user.email
        }
      })
      if (dbUser == null) {
        throw new Error('There is no user')
      }
      const { password, ...sessionUser } = dbUser
      const newSession = {
        ...session,
        user: sessionUser
      }
      return newSession
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
