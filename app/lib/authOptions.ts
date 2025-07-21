
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import { NextAuthOptions } from 'next-auth'
import clientPromise from '@/lib/mongodb'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const client = await clientPromise
        const db = client.db()
        const user = await db.collection('users').findOne({ email: credentials?.email })

        if (user && await compare(credentials!.password, user.password)) {
          return { id: user._id.toString(), name: user.name, email: user.email }
        }

        return null
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/auth/login' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user
      return token
    },
    async session({ session, token }) {
      session.user = token.user as typeof session.user
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
