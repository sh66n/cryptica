import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { connectToDb } from "./lib/connection";
import { User } from "./models/user.model";
import { authConfig } from "./lib/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, profile }) {
      if (user) {
        await connectToDb();
        const dbUser = await User.findOne({ username: profile.login });
        if (dbUser) {
          token.id = dbUser._id; // Add MongoDB `_id` to the token
        }
      }
      return token;
    },
    session({ session, token, user }) {
      session.user._id = token.id;
      return session; // The return type will match the one returned in `useSession()`
    },
    async signIn({ user, account, profile }) {
      if (account && account.provider === "github") {
        await connectToDb();
        try {
          const existingUser = await User.findOne({ username: profile.login });
          if (!existingUser) {
            const newUser = await User.create({
              name: user.name,
              username: profile.login,
              avatar: user.image,
            });
          }
        } catch (error) {
          console.error(error);
          return false;
        }
      }
      return true;
    },
    ...authConfig.callbacks,
  },
});
