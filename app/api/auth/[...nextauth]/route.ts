import NextAuth, { User, type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/lib/prisma'
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
  ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
