import NextAuth from "next-auth";
// import { ZodError } from "zod";
//import { signInSchema } from "@/lib/zod"
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db.js";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "Email",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "Password",
        },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          return null;
        }

        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },

  jwt: {
    maxAge: 15 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        try {
          const refreshToken = crypto.randomBytes(40).toString("hex");

          await prisma.refreshToken.create({
            data: {
              token: refreshToken,
              userId: user.id,
              expiresAt: new Date(Date.now() + 60 * 60 * 1000),
            },
          });
          return {
            ...token,
            id: user.id,
            role: user.role,
            refresh_token: refreshToken,
            exp: Math.floor(Date.now() / 1000) + 15 * 60,
          };
        } catch (error) {
          console.error("Error creating a refresh token:", error);
          return token;
        }
      }
      try {
        const dbToken = await prisma.refreshToken.findFirst({
          where: { token: token.refresh_token, userId: token.id },
        });

        if (!dbToken || dbToken.expiresAt < new Date()) {
          return null;
        }

        const now = Math.floor(Date.now() / 1000);
        if (token.exp && now > token.exp - 3 * 60) {
          return {
            ...token,
            exp: Math.floor(Date.now() / 1000 + 15 * 60),
            refresh_token: dbToken.token,
          };
        }
      } catch (error) {
        console.error("Error validating the refreshing token:", error);
        return token;
      }
      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
