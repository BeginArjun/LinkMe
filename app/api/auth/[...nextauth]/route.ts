import NextAuth , {AuthOptions} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import {compare}  from "bcrypt"
import prismadb from '../../../../lib/prismadb'
export const authOptions:AuthOptions={
  providers:[
      GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID || '',
          clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
        Credentials({
          id: 'credentials',
          name: 'Credentials',
          credentials: {
            email: {
              label: 'Email',
              type: 'text',
            },
            password: {
              label: 'Password',
              type: 'passord'
            }
          },
          async authorize(credentials) {
              if (!credentials?.email || !credentials?.password) {
                throw new Error('Email and password required');
              }
      
              const user = await prismadb.user.findUnique({ where: {
                email: credentials.email
              }});
      
              if (!user || !user.password) {
                throw new Error('Email does not exist');
              }
      
              const isCorrectPassword = await compare(credentials.password, user.password);
              if (!isCorrectPassword) {
                throw new Error(`Incorrect password : ${credentials.password,user.password}`);
              }
      
              return user;
            }
          })
  ],
  pages: {
      signIn: '/auth',
      signOut: '/auth/signout',
      error: '/auth/error', // Error code passed in query string as ?error=
      newUser: '/' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(prismadb),
  session: { strategy: 'jwt' },
  jwt: {
  secret: process.env.NEXTAUTH_JWT_SECRET,
},
secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }