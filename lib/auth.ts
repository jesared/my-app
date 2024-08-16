// auth.ts
import UserModel  from '@/app/models/user.model'
import type { NextAuthOptions } from "next-auth";
import { compare } from 'bcrypt';
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from '@/lib/mongodb';

connectDB();

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        try {
          const user = await UserModel.findOne({ email: credentials.email });

          if (!user || !(await compare(credentials.password, user.password))) {
            return null;
          }

          return {
            id: user._id,
            email: user.email,
            name: user.name,
            // randomKey: "Hey cool",
          };
        } catch (error) {
          console.error('Error in NextAuth authorization:', error);
          return null;
        }
      },
    }),
  ],
};
