"use client";

import React from "react";
import { signIn, signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <Button {...props} onClick={() => signIn(provider)}>
      Sign In
    </Button>
  );
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <Button
      className="w-full p-0"
      variant="ghost"
      onClick={() => signOut()}
      {...props}
    >
      Sign Out
    </Button>
  );
}
