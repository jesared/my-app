// auth/[...nextauth]/route.ts
import User from "@/app/models/user.model";
import connectDB from "@/lib/mongodb";
import bcrypt from "bcrypt";
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions : NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},

            async authorize(credentials, req) {
                const {email, password} = credentials as {
                  email: string,
                  password: string,
                }
                // const  { email , password } = credentials;
                
                try {
                    await connectDB();
                    const user = await User.findOne({  email });

                    if (!user) {
                        return Promise.resolve(null);
                    }

                    const passwordMatch = await bcrypt.compare(
                        password, 
                        user.password
                        );

                    if (!passwordMatch) {
                        return Promise.resolve(null);
                    }

                    return Promise.resolve(user);
                } catch (error) {
                    console.error('Erreur lors de l\'autorisation :', error);
                    return Promise.resolve(null);
                }
            },
        }),
    ],
    
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};
