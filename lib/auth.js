import NextAuth from "next-auth"
import { ZodError } from "zod"
import { signInSchema } from "@/lib/zod"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/db.js"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt"
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
            try {
                const { email, password: inputPassword } = await signInSchema.parseAsync(credentials)

                const user = await prisma.user.findUnique({
                    where: {
                        email: email,
                    }
                }
                )

                if (!user) {

                    return null;
                }


                const isValid = await bcrypt.compare(inputPassword, user.password);


                if (!isValid) {
                    return null;
                }


                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            } catch (error) {
                if (error instanceof ZodError) {

                    return null;

                }
                console.error("Authorize error:", error);
                return null;
            }
        }
    })],
})