import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./db/connect";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

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
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label: "Email", type: "email"},
        password: {label: "Password", type: "password"},
      },
      authorize: async (credentials) => {
        const email = credentials.email || undefined;
        const password = credentials.password || undefined;

        if (!email || !password) {
          throw new Error("Please provide both email and password");
        }

        const user = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        if (!user) {
          throw new Error("Invalid email or password");
        }

        // compare the the password with the password stored in the database
        const isMatched = await compare(password, user.password);

        if (!isMatched) {
          throw new Error("Invalid Password!");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          picture: user.image,
        };
      }
      return token;
    },

    async session({ session, token }) {
      if (!session.user) {
        session.user = {};
      }
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id || null,
          name: token.name || '',
          email: token.email || '',
          image: token.picture || '',
        },
      };
    },
  }
})