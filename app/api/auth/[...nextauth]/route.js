
import { baseURL } from "@/lib/helpers"
import axios from "axios"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                try {
                    // Validate the credentials or make a request to your authentication API
                    const { data } = await axios.post(`${baseURL}/api/auth/login`, {
                        email: credentials.email,
                        password: credentials.password,
                    })
                    // Check if authentication was successful
                    if (data) {
                        return data?.data
                    } else {
                        return Promise.resolve(null) // Authentication failed
                    }
                } catch (error) {
                    return Promise.resolve(null) // Handle errors appropriately
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 4 * 60 * 60,

    },
    callbacks: {
        jwt: async ({ token, user, session, trigger }) => {
            if (trigger === "update") {
                token.data = session
            } else {
                if (user) {
                    token.data = user
                }
            }
            return token
        },
        session: async ({ session, token }) => {
            if (token.data) {
                session.user = token.data
            }

            return session
        }
    },
    secret: process.env.COOKIE_SECRET,
    pages: {
        signIn: "/",
    },
    // Add other configuration options as needed
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };