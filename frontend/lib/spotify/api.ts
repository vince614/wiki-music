"use server";

import {
  FollowedArtists, MaxInt,
  SimplifiedAlbum,
  SpotifyApi,
} from "@spotify/web-api-ts-sdk";
import { SimplifiedPlaylist } from "@spotify/web-api-ts-sdk/src/types";

const spotifyApiUri = "https://api.spotify.com/v1";

const api = SpotifyApi.withClientCredentials(
  process.env.AUTH_SPOTIFY_ID as string,
  process.env.AUTH_SPOTIFY_SECRET as string,
);

export async function searchSpotifySong(query: string, limit: MaxInt<50> = 20) {
  return await api.search(
    query,
    ["track", "artist", "album"],
    undefined,
    limit,
  );
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

export async function getUserAlbums(
  accessToken: string,
  limit: number = 20,
  offset: number = 0,
  market?: string,
): Promise<SimplifiedAlbum[]> {
  let url = new URL(`${spotifyApiUri}/me/albums`);

  url.searchParams.append("limit", limit.toString());
  url.searchParams.append("offset", offset.toString());
  if (market) {
    url.searchParams.append("market", market);
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  return data.items;
}

export async function getUserFollowedArtists(
  accessToken: string,
  after?: string,
  limit: number = 20,
): Promise<FollowedArtists[]> {
  let url = new URL(`${spotifyApiUri}/me/following`);

  url.searchParams.append("type", "artist");
  url.searchParams.append("limit", limit.toString());
  if (after) {
    url.searchParams.append("after", after);
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  return data.artists.items;
}
