import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "password",
      name: "Username and Password",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username...",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password...",
        },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { username: credentials!.username },
        });

        if (!user) {
          console.log("User not found");
          return null;
        }

        const match = await bcrypt.compare(
          credentials!.password,
          user.password,
        );

        if (!match) {
          console.log("Invalid credentials");
          return null;
        }
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as User;
      }
      return token;
    },
    async session({ token, session }) {
      session.user = token.user;
      return session;
    },
  },
};

export default authOptions;
