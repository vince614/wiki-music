import type { NextAuthConfig } from "next-auth";

// eslint-disable-next-line import/order
import NextAuth from "next-auth";
import "next-auth/jwt";

import Spotify from "next-auth/providers/spotify";
import { createStorage } from "unstorage";
import memoryDriver from "unstorage/drivers/memory";
import { UnstorageAdapter } from "@auth/unstorage-adapter";

import { upsertUser } from "@/lib/user/data";

// Create a storage instance
const storage = createStorage({
  driver: memoryDriver(),
});

const config = {
  theme: {
    colorScheme: "auto",
    brandColor: "#7289da",
    logo: "https://authjs.dev/img/logo-sm.png",
  },
  adapter: UnstorageAdapter(storage),
  providers: [
    Spotify({
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-email%20user-read-private%20user-library-read%20playlist-read-private%20user-read-playback-state%20user-read-currently-playing%20user-modify-playback-state%20user-follow-read&response_type=code",
    }),
  ],
  session: { strategy: "jwt" },
  trustHost: true,
  callbacks: {
    // Update or insert user data in the database
    async signIn({ user, account, profile }) {
      if (!user.email) return false;

      if (profile?.id) {
        const userInfos = await upsertUser({
          name: user.name ?? "Unknown User",
          email: user.email,
          avatar: user.image,
          provider: account?.provider as string,
          identifier: profile.id,
          refreshToken: account?.refresh_token,
          href: profile.href as string,
        });

        return !!userInfos;
      }

      return false;
    },
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;

      if (pathname === "/dashboard") return !!auth;

      return true;
    },
    jwt({ token, account, profile }) {
      if (account?.provider === "spotify") {
        return {
          ...token,
          accessToken: account.access_token,
          identifier: profile?.id ?? undefined,
        };
      }

      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
        session.identifier = token.identifier as string;
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;

      return baseUrl;
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
    accessToken: string;
    identifier: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    identifier?: string;
  }
}
