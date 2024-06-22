import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            profile(profile){
                console.log('Profile Github:', profile);
                let userRole = 'Github User'
                // This is user is going to be inside session.user.role you can see it on Member page if you are logged in
                //if you area logging in with github you can see the userRole is admin user as set below
                if(profile?.email === 'rafael_massimo@hotmail.com'){
                    userRole = "Admin"
                }
                return {
                    //here im sending all the properties that I got from github and make it separate
                    ...profile,
                    //Here I'm applying the userRole to the user that I decided few line above
                    role: userRole
                }
            },
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        GoogleProvider({
            profile(profile){
                console.log('Profile Google:', profile);
                let userRole = 'Google User'
                //Here we are going to have the userRole as google User from the line 27 you can see it on the Member page if you are logged in
                // if(profile?.email === 'rafael_massimo@hotmail.com'){
                //     userRole = "Admin"
                // }
                return {
                    //here im sending all the properties that I got from google and make it separate
                    ...profile,
                      //Here I'm applying the userRole to the user that I decided few line above
                    role: userRole,
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
                //if you do not have a role it will be a *user* as defined below
                session.user.role = token.role || "*USER*"
            }
            return session
        }
    }
};

export default options;
