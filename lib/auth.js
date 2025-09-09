import NextAuth from "next-auth"
// import { ZodError } from "zod";
//import { signInSchema } from "@/lib/zod"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/db.js"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({


    adapter: PrismaAdapter(prisma),

    providers: [Credentials({
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

            const { _password, ...userWithoutPassword } = user;

            return userWithoutPassword;
        }
    })],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },

    jwt: {
        maxAge: 60 * 60 * 24 * 30,
    },

    callbacks: {
        async jwt({ token, user }) {

            if (user) {
                return {
                    ...token,
                    id: user.id,
                    role: user.role,
                };
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
    secret: process.env.NEXTAUTH_SECRET


})