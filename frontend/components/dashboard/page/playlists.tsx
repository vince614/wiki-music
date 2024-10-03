"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { SimplifiedPlaylist } from "@spotify/web-api-ts-sdk/src/types";

export default async function Playlist({
  playlist,
}: {
  playlist: SimplifiedPlaylist;
}) {
  return (
    <div
      key={playlist.id}
      className="flex items-center justify-between p-2 bg-default-100 rounded-lg mt-4"
    >
      <div className="flex items-center gap-3">
        <Icon className="h-6 w-6 text-default-500" icon="carbon:playlist" />
        <div>
          <p className="text-sm font-medium text-default-700">
            {playlist.name}
          </p>
          <p className="text-xs text-default-400">{playlist.description}</p>
        </div>
      </div>
      <Button
        className="bg-default-foreground text-background"
        radius="md"
        size="sm"
        variant="shadow"
      >
        View
      </Button>
    </div>
  );
}
