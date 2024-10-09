"use client";

import { useSession } from "next-auth/react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignIn, SignOut } from "@/components/auth/auth-components";

export default function UserButton() {
  const { data: session } = useSession();

  return !session?.user ? (
    <SignIn />
  ) : (
    <div className="flex items-center gap-2">
      <span className="hidden text-sm sm:inline-flex">{session.user.name}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="relative h-8 w-8 rounded-full" variant="ghost">
            <Avatar className="h-8 w-8">
              <AvatarImage
                alt={session.user.name ?? ""}
                src={
                  session.user.image ??
                  `https://api.dicebear.com/9.x/thumbs/svg?seed=${Math.floor(Math.random() * 100000) + 1}&randomizeIds=true`
                }
              />
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent forceMount align="end" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user.name}
              </p>
              <p className="text-muted-foreground text-xs leading-none">
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <SignOut />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
