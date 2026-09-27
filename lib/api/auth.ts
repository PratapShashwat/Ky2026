import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { useAuthenticate } from "./hooks/useAuthenticate";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        const { authenticate } = useAuthenticate();
        try {
          authenticate({
            id: user.id,
            email: user.email,
            firstName: user.name?.split(" ")[0] ?? "",
            lastName: user.name?.split(" ").slice(1).join(" ") ?? "",
            avatarUrl: user.image ?? undefined,
          });
          return true;
        } catch (err: unknown) {
          // 409 means user already exists, allow sign-in
          if (
            err &&
            typeof err === "object" &&
            "status" in err &&
            err.status === 409
          ) {
            return true;
          }

          return false;
        }
      }
      return false;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }

      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
});
