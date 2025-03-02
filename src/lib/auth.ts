import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import nextConfig from "../../next.config";

export const {
    handlers: { GET, POST },
    auth, signIn, signOut
} = NextAuth({
    providers: [
        GoogleProvider({
            clientId: nextConfig?.env?.googleProviderId,
            clientSecret: nextConfig?.env?.googleProviderSecret,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                }
            }
        })
    ]
})
