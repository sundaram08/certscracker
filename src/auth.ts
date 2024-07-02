import NextAuth, {CredentialsSignin}  from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "./models/userModel";
import { compare, hash } from "bcryptjs";
import { connectDB } from "./lib/utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const username = credentials.username as string | undefined;
        const password = credentials.password as string | undefined;

        if (!password || !username)
          throw new CredentialsSignin("Invalid Credentials");

        // connecting to db
        await connectDB();

        const user = await User.findOne({ username }).select("+password");

        if (!user) throw new CredentialsSignin("Invalid Username");

        if (!user.password)
          throw new CredentialsSignin("Invalid Username or Password");

        const isMatch = await compare(password, user.password);

        if (!isMatch) throw new CredentialsSignin("Invalid Password");


        return {
          id: user._id!.toString(),
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      // Add the user id to the session object
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user }) {
      // Add the user id to the token object
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});
