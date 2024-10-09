"use client";

import { Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import React from "react";

export default function HomeComponent() {
  return (
    <div className="w-full max-w-2xl flex-1 p-4">
      {/* Title */}
      <div className="flex items-center gap-x-3">
        <Button isIconOnly className="sm:hidden" size="sm" variant="flat">
          <Icon
            className="text-default-500"
            icon="solar:sidebar-minimalistic-linear"
            width={20}
          />
        </Button>
        <h1 className="text-3xl font-bold leading-9 text-default-foreground">
          Home
        </h1>
      </div>
      <h2 className="mt-2 text-small text-default-500">
        Welcome to your dashboard.
      </h2>
    </div>
  );
}
