import type { NextAuthConfig } from "next-auth";

import NextAuth from "next-auth";
import "next-auth/jwt";

import Discord from "next-auth/providers/discord";
import Google from "next-auth/providers/google";
import { createStorage } from "unstorage";
import memoryDriver from "unstorage/drivers/memory";
import { UnstorageAdapter } from "@auth/unstorage-adapter";

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
  adapter: UnstorageAdapter(storage), // Use the storage adapter
  providers: [Discord, Google],
  //basePath: "/auth",
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;

      if (pathname === "/dashboard") return !!auth;

      return true;
    },
    jwt({ token, trigger, session, account }) {
      if (trigger === "update") token.name = session.user.name;
      if (account?.provider === "keycloak") {
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
  debug: process.env.NODE_ENV !== "production",
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
