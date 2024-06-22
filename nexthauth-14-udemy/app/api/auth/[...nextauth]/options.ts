import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            profile(profile){
                console.log('Profile Github:', profile);
                let userRole = 'Github User'
                if(profile?.email === 'rafael_massimo@hotmail.com'){
                    userRole = "Admin"
                }
                return {
                    ...profile,
                    userRole
                }
            },
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        GoogleProvider({
            profile(profile){
                console.log('Profile Google:', profile);
                let userRole = 'Google User'
                if(profile?.email === 'rafael_massimo@hotmail.com'){
                    userRole = "Admin"
                }
                return {
                    ...profile,
                    userRole,
                    id:profile.sub
                }
            },
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({token, account, user}){
            if(account){
                token.role = user.role
            }
            return token
        },
        session({session, token}) {
            if(session.user){
                session.user.role = token.role || "USER"
            }
            return session
        }
    }
};

export default options;
