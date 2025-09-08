import NextAuth from "next-auth"
// import { ZodError } from "zod";
//import { signInSchema } from "@/lib/zod"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/db.js"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 60,
    },
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
})