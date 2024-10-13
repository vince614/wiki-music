"use server";

import { SimplifiedPlaylist } from "@spotify/web-api-ts-sdk/src/types";
import { FollowedArtists, SimplifiedAlbum } from "@spotify/web-api-ts-sdk";

const spotifyApiUri = "https://api.spotify.com/v1";

export async function checkAccessToken(accessToken: string): Promise<boolean> {
  const response = await fetch(`${spotifyApiUri}/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.ok;
}

export async function getUserPlaylists(
  accessToken: string,
  limit: number = 20,
  offset: number = 0
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
  market?: string
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
  limit: number = 20
): Promise<FollowedArtists> {
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
