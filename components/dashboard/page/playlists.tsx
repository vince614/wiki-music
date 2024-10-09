"use client";

import React from "react";
import { Accordion, AccordionItem, Avatar } from "@nextui-org/react";
import { SimplifiedPlaylist } from "@spotify/web-api-ts-sdk/src/types";

export default function Playlist({
  playlists,
}: {
  playlists: SimplifiedPlaylist[];
}) {
  return (
    <Accordion selectionMode="single">
      {playlists.map((playlist: SimplifiedPlaylist) => (
        <AccordionItem
          key={playlist.id}
          startContent={
            <Avatar
              alt={playlist.name}
              radius="lg"
              src={playlist.images[0]?.url}
            />
          }
          subtitle={playlist.tracks?.total + " tracks"}
          title={playlist.name}
        >
          <div className="flex items-center gap-2">
            <img
              alt={playlist.name}
              className="w-12 h-12 rounded-lg"
              src={playlist.images[0]?.url}
            />
            <div>
              <p className="text-sm font-medium text-default-700">
                {playlist.name}
              </p>
              <p className="text-xs text-default-400">
                {playlist.tracks?.total} tracks
              </p>
            </div>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
