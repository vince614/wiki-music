"use server";

import { UserFormInterface } from "@/types/interface";
import {
  getUserAlbums,
  getUserFollowedArtists,
  getUserPlaylists,
} from "@/lib/spotify/user";

export const upsertUser = async (data: UserFormInterface) => {
  const response = await fetch("http://localhost:3000/api/users/upsert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  console.log(result);

  return result;
};

export const syncUserData = async (accessToken: string, identifier: string) => {
  return await fetch("http://localhost:3000/api/users/sync", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accessToken: accessToken,
      identifier: identifier,
    }),
  });
};
