import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./db/connect";
import Google from "next-auth/providers/google";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  pages: {
    signIn: "/auth/sign-in",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    // Github({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // })
  ],
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        return {
          ...token,
          id: user.id,
        }
      }
    },

    async session({session, token}) {
      console.log("session callback", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        }
      }
    },
  }
})