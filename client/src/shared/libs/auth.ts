import NextAuth, {
  NextAuthOptions,
  Account,
  Session,
  User,
  Profile,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import {
  getCurrentProfileBySession,
  getCurrentUser,
} from "@/entities/user/libs/userService";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({
      token,
      account,
      user,
    }: {
      token: JWT;
      account: Account | null;
      user: User | undefined;
    }): Promise<JWT> {
      if (account && user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },

    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      if (session.user) {
        const profile = await getCurrentProfileBySession(session.user);
        session.user.id = profile?.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name ?? "";
        session.user.image = token.image ?? "";
      }
      return session;
    },

    async signIn(request: {
      user: User | undefined;
      account: Account | null;
      profile?: Profile;
    }): Promise<boolean> {
      if (!request.account || !request.user) return false;
      const profile = await getCurrentUser(request.user);
      return !!profile;
    },

    async redirect({
      baseUrl,
    }: {
      url: string;
      baseUrl: string;
    }): Promise<string> {
      return baseUrl;
    },
  },
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
