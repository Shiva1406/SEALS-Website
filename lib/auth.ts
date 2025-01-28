import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions:NextAuthOptions={
    adapter:PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session:{
        strategy:'jwt'
    },
    pages:{
        signIn: '/sign-in',
    },
    providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
        email: { label: "Email", type: "email", placeholder: "user@gmail.com" },
        password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {

        if(!credentials?.email || !credentials?.password){
            return null;
            //throw new Error('Email and password are required');
        }


        const existingUser= await db.user.findUnique({ 
            where : {email: credentials?.email}
        });

        if(!existingUser){
            //return null;
            throw new Error('No user found with this email');
        }

        const passwordMatch =await compare(credentials?.password, existingUser.password);

        if(!passwordMatch){
            //return null;
            throw new Error('Incorrect password');
        }

        return{
            id: `${existingUser.id}`,
            username:existingUser.username,
            email:existingUser.email

        }
    }
    })
    ],
    callbacks: {
        async jwt({ token, user}) {
            if (user) {
                return {
                    ...token,
                    username: user.username
                }
            }
            return token
          },
          async session({ session, token }) {

            return {
                ...session,
                user:{
                    ...session.user,
                    username:token.username
                }
            }
            
            return session
          }

    }


}