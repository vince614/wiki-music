import type { NextAuthConfig } from "next-auth";

// eslint-disable-next-line import/order
import NextAuth from "next-auth";
import "next-auth/jwt";

import Discord from "next-auth/providers/discord";
import Google from "next-auth/providers/google";
import Spotify from "next-auth/providers/spotify";

import { createStorage } from "unstorage";
import memoryDriver from "unstorage/drivers/memory";
import { UnstorageAdapter } from "@auth/unstorage-adapter";

import { upsertUser } from "@/lib/user/data";

// Create a storage instance
const storage = createStorage({
  driver: memoryDriver(),
});

// @ts-ignore
// @ts-ignore
const config = {
  theme: {
    colorScheme: "auto",
    brandColor: "#7289da",
    logo: "https://authjs.dev/img/logo-sm.png",
  },
  adapter: UnstorageAdapter(storage),
  providers: [Discord, Google, Spotify],
  session: { strategy: "jwt" },
  callbacks: {
    // Update or insert user data in the database
    async signIn({ user, account }) {
      if (!user.email) return false;

      const userInfos = await upsertUser({
        name: user.name ?? "Unknown User",
        email: user.email,
        avatar: user.image,
        provider: account?.provider ?? "form",
      });

      return !!userInfos;
    },
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;

      if (pathname === "/dashboard") return !!auth;

      return true;
    },
    jwt({ token, account }) {
      if (account?.provider === "spotify") {
        return { ...token, accessToken: account.access_token };
      }

      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }

      return session;
    },
  },
  experimental: {
    enableWebAuthn: true,
  },
  debug: false,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
