"use server";

import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { Page, SimplifiedPlaylist } from "@spotify/web-api-ts-sdk/src/types";

const spotifyApiUri = "https://api.spotify.com/v1";

const api = SpotifyApi.withClientCredentials(
  process.env.AUTH_SPOTIFY_ID as string,
  process.env.AUTH_SPOTIFY_SECRET as string,
);

export async function searchSong(query: string) {
  return await api.search(query, ["track"]);
}

export async function getUserPlaylists(
  accessToken: string,
  limit: number = 20,
  offset: number = 0,
): Promise<SimplifiedPlaylist[]> {
  let url = new URL(`${spotifyApiUri}/me/playlists`);

  url.searchParams.append("limit", limit.toString());
  url.searchParams.append("offset", offset.toString());

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  return data.items;
}
